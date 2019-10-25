import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  padding: 20px 20px 0;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 17px 0 37px;
`;

export const DateNavButton = styled(TouchableOpacity)`
  margin: 0 10px;
`;

export const DateNavIcon = styled(Icon).attrs({
  size: 25,
  color: '#FFF',
})``;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyListMessage = styled.Text`
  color: #fff;
`;
