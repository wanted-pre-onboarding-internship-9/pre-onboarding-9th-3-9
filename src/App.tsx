import styled from 'styled-components';

import Chart from './components/Chart';
import useData from './hooks/useData';

function App() {
  const { data } = useData();

  return (
    <StyledContainer>
      <StyledChartBox>
        <Chart data={data || {}} />
      </StyledChartBox>
    </StyledContainer>
  );
}

export default App;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const StyledChartBox = styled.div`
  position: relative;
  margin: 0 auto;
  width: 50%;
  height: 50%;
`;
