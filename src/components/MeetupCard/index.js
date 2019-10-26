import React from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/Button';

import {
  Container,
  Content,
  Title,
  Field,
  Icon,
  FieldText,
  Banner,
} from './styles';

export default function Meetup({ data, buttonText, onButtonPress }) {
  console.tron.log('data', data);
  return (
    <Container>
      <Banner source={{ uri: data.banner.url }} />
      <Content>
        <Title>{data.title}</Title>

        <Field>
          <Icon name="event" />
          <FieldText>{data.dateFormatted}</FieldText>
        </Field>
        <Field>
          <Icon name="place" />
          <FieldText>{data.location}</FieldText>
        </Field>
        <Field>
          <Icon name="person" />
          <FieldText>Organizador: {data.organizer.name}</FieldText>
        </Field>
        <Button onPress={onButtonPress}>{buttonText}</Button>
      </Content>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    location: PropTypes.string,
    dateFormatted: PropTypes.string,
    organizer: PropTypes.shape({
      name: PropTypes.string,
    }),
    banner: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  buttonText: PropTypes.string.isRequired,
  onButtonPress: PropTypes.func.isRequired,
};
