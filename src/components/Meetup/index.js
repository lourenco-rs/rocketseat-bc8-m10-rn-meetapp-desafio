import React from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/Button';
import banner from '~/assets/banner.png';

import { Container, Content, Title, Text, Banner } from './styles';

export default function Meetup({ data }) {
  return (
    <Container>
      <Banner source={banner} />
      <Content>
        <Title>{data.title}</Title>
        <Text>{data.dateFormatted}</Text>
        <Text>{data.location}</Text>
        <Text>Organizador: {data.User.name}</Text>
        <Button>Realizar inscrição</Button>
      </Content>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    location: PropTypes.string,
    dateFormatted: PropTypes.string,
    User: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};
