import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';

import { format, parseISO, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { errorMessage } from '~/util/errorHandler';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import DateInput from './DateInput';
import Meetup from '~/components/Meetup';

import api from '~/services/api';

import {
  Container,
  DateContainer,
  DateNavButton,
  DateNavIcon,
  MeetupList,
  EmptyListContainer,
  EmptyListMessage,
} from './styles';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);

  let onEndReachedCalledDuringMomentum = true;

  useEffect(() => {
    setMeetups([]);
    setPage(1);
    setInitialLoading(true);
  }, [date, isFocused]);

  useEffect(() => {
    if (!isFocused) return;

    (async function loadMeetups() {
      const response = await api.get('available', {
        params: {
          date,
          page,
        },
      });

      const data = response.data.map(meetup => ({
        ...meetup,
        dateFormatted: format(parseISO(meetup.date), "dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
      }));

      setMeetups(prevMeetups => prevMeetups.concat(data));
      setInitialLoading(false);
      setLoadingMore(false);
    })();
  }, [date, isFocused, page]);

  function loadMore() {
    setLoadingMore(true);
    setPage(page + 1);
  }

  async function handleSubscribe(meetupId) {
    try {
      await api.post(`subscriptions/${meetupId}`);

      showMessage({
        type: 'success',
        icon: 'auto',
        message: 'Inscrição realizada com sucesso',
      });
    } catch (error) {
      showMessage({
        type: 'danger',
        icon: 'auto',
        message: errorMessage(error),
      });
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateContainer>
          <DateNavButton onPress={() => setDate(subDays(date, 1))}>
            <DateNavIcon name="chevron-left" />
          </DateNavButton>
          <DateInput date={date} onChange={setDate} />
          <DateNavButton onPress={() => setDate(addDays(date, 1))}>
            <DateNavIcon name="chevron-right" />
          </DateNavButton>
        </DateContainer>

        {initialLoading && page === 1 && <Loading centralized />}

        {!initialLoading && !!meetups.length && (
          <MeetupList
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup data={item} onSubscribe={handleSubscribe} />
            )}
            ListFooterComponent={loadingMore && <Loading />}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              if (!onEndReachedCalledDuringMomentum) {
                loadMore();
                onEndReachedCalledDuringMomentum = true;
              }
            }}
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMomentum = false;
            }}
          />
        )}

        {!initialLoading && page === 1 && !meetups.length && (
          <EmptyListContainer>
            <EmptyListMessage>Não há meetups nessa data</EmptyListMessage>
          </EmptyListContainer>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
