import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px 20px 0;
`;

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
