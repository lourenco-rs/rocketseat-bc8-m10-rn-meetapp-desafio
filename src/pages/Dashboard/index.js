import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { errorMessage } from '~/util/errorHandler';

import Background from '~/components/Background';
import Header from '~/components/Header';
import DateInput from './DateInput';
import Meetup from '~/components/Meetup';

import api from '~/services/api';

import { Container, MeetupList } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    (async function loadMeetups() {
      const response = await api.get('available', {
        params: {
          date,
        },
      });

      const data = response.data.map(meetup => ({
        ...meetup,
        dateFormatted: format(parseISO(meetup.date), "dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
      }));

      setMeetups(data);
    })();
  }, [date]);

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
        <DateInput date={date} onChange={setDate} />

        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup data={item} onSubscribe={handleSubscribe} />
          )}
        />
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
