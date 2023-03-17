import styled from 'styled-components';

import Chart from '../components/Chart';
import FilterBtn from '../components/FilterBtn';
import { useChartData } from '../hooks/useChartData';

const ChartPage = () => {
  const { idArray } = useChartData();

  const filterBtnList: string[] = [...new Set(idArray)].concat('전체');

  return (
    <>
      <StHeader>Flexys</StHeader>
      <StBtnContainer>
        {filterBtnList.map(id => (
          <FilterBtn key={id} btnName={id} />
        ))}
      </StBtnContainer>
      <StChartContainer>
        <Chart />
      </StChartContainer>
    </>
  );
};

export default ChartPage;

const StBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px;
`;

const StChartContainer = styled.div`
  margin: 0 auto;
  width: 70%;
  padding: 40px;
`;

const StHeader = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  font-style: italic;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;
`;
