import styled from 'styled-components';

import Chart from './components/Chart';

function App() {
  return (
    <StApp>
      <h1>Flexsys</h1>
      <Chart />
    </StApp>
  );
}

export default App;

const StApp = styled.div`
  text-align: center;
`;
