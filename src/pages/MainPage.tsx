import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Background from '../components/Background';
import Button from '../components/Button';
import Chart from '../components/Chart';
import Logo from '../components/Logo';
import useChartData from '../hooks/useChartData';

function MainPage() {
  const { data, dedupRegions, dateRange } = useChartData();
  const [startDate, endDate] = dateRange;
  const [selectedRegion, setSelectedRegion] = useSearchParams();

  const handleFilter = (region: string) => {
    setSelectedRegion({ id: region });
  };

  return (
    <StyledContainer>
      <Background />
      <Logo />
      <StyledButtonBox>
        <Button
          text='전체'
          isActivated={'whole' === selectedRegion.get('id')}
          onClick={() => handleFilter('whole')}
        />
        {dedupRegions.map(region => (
          <Button
            key={region}
            text={region}
            isActivated={region === selectedRegion.get('id')}
            onClick={() => handleFilter(region)}
          />
        ))}
      </StyledButtonBox>
      {startDate && (
        <StyledDateRange>{`${startDate} ~ ${endDate}`}</StyledDateRange>
      )}
      <StyledChartBox>
        <Chart
          data={data}
          selectedData={selectedRegion.get('id')}
          setSelectedData={handleFilter}
        />
      </StyledChartBox>
    </StyledContainer>
  );
}

export default MainPage;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  gap: 10px;
`;

const StyledButtonBox = styled.div`
  display: flex;
  gap: 10px;
  height: 50px;
  padding-top: 1em;
  margin-top: 2em;
`;

const StyledDateRange = styled.div`
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  font-style: italic;
  user-select: none;
`;

const StyledChartBox = styled.div`
  position: relative;
  margin: 0 auto;
  width: 80%;
  height: 500px;
  overflow: hidden;
`;
