import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { errorMessage } from '~/util/errorHandler';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import MeetupCard from '~/components/MeetupCard';

import api from '~/services/api';

import {
  Container,
  MeetupList,
  EmptyListContainer,
  EmptyListMessage,
} from './styles';

function Subscriptions({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!isFocused) return;

    setMeetups([]);
    setInitialLoading(true);

    (async function loadMeetups() {
      const response = await api.get('subscriptions');

      const data = response.data.map(subscription => ({
        subscriptionId: subscription.id,
        ...subscription.Meetup,

        dateFormatted: format(
          parseISO(subscription.Meetup.date),
          "d 'de' MMMM', às' HH:mm",
          {
            locale: pt,
          }
        ),
      }));

      console.tron.log(data);

      setMeetups(data);
      setInitialLoading(false);
    })();
  }, [isFocused]);

  async function handleUnsubscribe(meetup) {
    try {
      await api.delete(`subscriptions/${meetup.subscriptionId}`);

      setMeetups(meetups.filter(m => m.id !== meetup.id));

      showMessage({
        type: 'success',
        icon: 'auto',
        message: `Cancelamento do meetup "${meetup.title}" realizado com sucesso`,
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
        {initialLoading && <Loading centralized />}

        {!initialLoading && !!meetups.length && (
          <MeetupList
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <MeetupCard
                data={item}
                buttonText="Cancelar inscrição"
                onButtonPress={() => handleUnsubscribe(item)}
              />
            )}
          />
        )}

        {!meetups.length && (
          <EmptyListContainer>
            <EmptyListMessage>
              Você não está inscrito em nenhum MeetUp
            </EmptyListMessage>
          </EmptyListContainer>
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
