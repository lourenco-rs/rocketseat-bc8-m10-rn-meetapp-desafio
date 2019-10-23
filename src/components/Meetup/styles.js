import styled from 'styled-components/native';

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

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

export const Content = styled.View`
  padding: 20px;
`;

export const Text = styled.Text`
  font-size: 13px;
  color: #999;
  margin: 0 0 15px 20px;
`;
