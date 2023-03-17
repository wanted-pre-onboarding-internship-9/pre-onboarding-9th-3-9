import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

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
  const handleQueryDelete = () => {
    const param = selectedRegion.get('id');
    if (param) {
      selectedRegion.delete('id');
      setSelectedRegion(selectedRegion);
    }
  };

  return (
    <StyledContainer>
      <Logo />
      <StyledButtonBox>
        <Button
          text='전체'
          isActivated={!selectedRegion.get('id')}
          onClick={handleQueryDelete}
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
  gap: 10px;

  background: linear-gradient(-45deg, #084464, #000101, #433abe);
  background-size: 200% 200%;
  animation: move-background 20s ease-in-out infinite;

  @keyframes move-background {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
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
