import React from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import banner from '~/assets/banner.png';

import {
  Container,
  Content,
  Title,
  Field,
  Icon,
  FieldText,
  Banner,
} from './styles';

export default function Meetup({ data, onSubscribe, onUnsubscribe }) {
  return (
    <Container>
      <Banner source={banner} />
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
          <FieldText>Organizador: {data.User.name}</FieldText>
        </Field>

        {onSubscribe && (
          <Button onPress={() => onSubscribe(data.id)}>
            Realizar inscrição
          </Button>
        )}

        {onUnsubscribe && (
          <Button onPress={() => onUnsubscribe(data.id)}>
            Cancelar inscrição
          </Button>
        )}
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
    User: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  onSubscribe: PropTypes.func,
  onUnsubscribe: PropTypes.func,
};

Meetup.defaultProps = {
  onSubscribe: undefined,
  onUnsubscribe: undefined,
};
