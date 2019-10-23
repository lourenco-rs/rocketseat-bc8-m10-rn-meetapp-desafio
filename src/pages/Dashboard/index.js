import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import DateInput from './DateInput';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import api from '~/services/api';

import { Container, MeetupList } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    (async function loadMeetups() {
      const response = await api.get('meetups', {
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

  return (
    <Background>
      <Header />
      <Container>
        <DateInput date={date} onChange={setDate} />

        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetup data={item} />}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetapps',
};
