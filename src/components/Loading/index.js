import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

export default function Loading({ size, color, centralized }) {
  return centralized ? (
    <Container>
      <ActivityIndicator size={size} color={color} />
    </Container>
  ) : (
    <ActivityIndicator size={size} color={color} />
  );
}

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  centralized: PropTypes.bool,
};

Loading.defaultProps = {
  size: 'large',
  color: '#999',
  centralized: false,
};
