import styled from 'styled-components/native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
  overflow: hidden;
`;

export const Banner = styled.Image.attrs({
  resizeMode: 'cover',
})`
  height: 150px;
  width: 100%;
`;

export const Content = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

export const Field = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: 15px;
`;

export const Icon = styled(MaterialIcon).attrs({
  color: '#999',
})`
  margin-right: 6px;
`;

export const FieldText = styled.Text`
  font-size: 13px;
  color: #999;
`;
