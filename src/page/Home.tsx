import styled, { keyframes } from 'styled-components';

import Filter from '../components/Filter';
import TimeChart from '../components/TimeChart';
import { useChartDataState } from '../hooks/useChartDataState';

export default function Home() {
  const {
    isLoading,
    dateValues,
    areaValues,
    barValues,
    idValues,
    districtValues,
  } = useChartDataState();

  if (isLoading) return <Main>isLoading...</Main>;
  return (
    <Main>
      <Section>
        <Title>Flexsys Time Series Chart</Title>
        <ChartContents className='chart-section'>
          <Filter districtValues={districtValues} />
          <TimeChart
            dateValues={dateValues}
            idValues={idValues}
            areaValues={areaValues}
            barValues={barValues}
          />
        </ChartContents>
      </Section>
    </Main>
  );
}
const keyframesBg = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
`;

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 20px 150px;
  box-sizing: border-box;
  background: linear-gradient(
    -45deg,
    ${props => props.theme.bg.gradient_1},
    ${props => props.theme.bg.gradient_2},
    ${props => props.theme.bg.gradient_3}
  );
  background-size: 300% 300%;
  animation: ${keyframesBg} 20s ease-in-out infinite;
  color: ${props => props.theme.color.white};
  text-align: center;
`;
const Section = styled.section`
  margin: 0 auto;
  padding: 20px 40px;
  box-sizing: border-box;
`;
const ChartContents = styled.div``;
const Title = styled.h1``;
