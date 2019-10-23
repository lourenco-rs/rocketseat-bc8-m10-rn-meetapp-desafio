import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo-header.png';

import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <Image source={logo} width="23" height="24" />
    </Container>
  );
}
