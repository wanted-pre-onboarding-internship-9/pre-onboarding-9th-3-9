import { useEffect, useState } from 'react';

import { getChartApi } from '../apis/chartApi';
import { ChartData, ItemData } from '../types/chartTypes';

export const useChartData = () => {
  const [chartData, setChartData] = useState<ChartData>({
    dateTimeArray: [],
    idArray: [],
    areaArray: [],
    barArray: [],
  });

  useEffect(() => {
    getChartApi().then((response: { [key: string]: ItemData }) => {
      const dateTimeArray = Object.keys(response);
      const idArray = Object.values(response).map(item => item.id);
      const areaArray = Object.values(response).map((item, index) => ({
        x: dateTimeArray[index],
        y: item.value_area,
        fillColor: '#26E7A6',
      }));
      const barArray = Object.values(response).map((item, index) => ({
        x: dateTimeArray[index],
        y: item.value_bar,
        fillColor: '#008FFB',
      }));
      setChartData({ dateTimeArray, idArray, areaArray, barArray });
    });
  }, []);

  return chartData;
};
