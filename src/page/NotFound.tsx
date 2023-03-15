import styled from 'styled-components';

export default function NotFound() {
  return (
    <Main>
      <Text>잘못된 경로 입니다. </Text>
    </Main>
  );
}

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;
const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;
