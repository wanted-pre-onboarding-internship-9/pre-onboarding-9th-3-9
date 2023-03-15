import { useEffect, useState } from 'react';

import Chart from '../components/Chart';
import { useChartData } from '../hooks/useChartData';
import { YAxisData } from '../types/chartTypes';

const ChartPage = () => {
  const { dateTimeArray, idArray, areaArray, barArray } = useChartData();
  const [barArrayState, setBarArrayState] = useState<YAxisData[]>([]);
  const [areaArrayState, setAreaArrayState] = useState<YAxisData[]>([]);

  useEffect(() => {
    setBarArrayState(barArray);
    setAreaArrayState(areaArray);
  }, [barArray, areaArray]);

  const uniqueIdList = [...new Set(idArray)];

  const handleFilter = (selectedId: string) => {
    const highlightedBarArray = barArray.map((barData, index) => {
      const fillColor = idArray[index] === selectedId ? '#fb00a6' : '#008FFB';
      return { ...barData, fillColor };
    });
    const highlightedAreaArray = areaArray.map((areaData, index) => {
      const fillColor = idArray[index] === selectedId ? '#fb00a6' : '#26E7A6';
      return { ...areaData, fillColor };
    });
    setBarArrayState([...highlightedBarArray]);
    setAreaArrayState([...highlightedAreaArray]);
  };

  return (
    <div>
      <div>
        {uniqueIdList.map(id => (
          <button key={id} onClick={() => handleFilter(id)}>
            {id}
          </button>
        ))}
      </div>
      <Chart
        dateTimeArray={dateTimeArray}
        idArray={idArray}
        barArrayState={barArrayState}
        areaArrayState={areaArrayState}
        handleFilter={handleFilter}
      />
    </div>
  );
};

export default ChartPage;
