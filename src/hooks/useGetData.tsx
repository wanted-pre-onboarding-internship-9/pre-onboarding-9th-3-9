import { useEffect, useState } from 'react';

import { getData } from '../apis/instance';
import { IChartData, IMockData } from '../types/types';

const useGetData = () => {
  const [mockData, setMockData] = useState<IMockData>();

  useEffect(() => {
    getData().then(res => {
      setMockData(res.data.response);
    });
  }, []);

  const chartData: IChartData[] = Object.entries(mockData || [])?.map(
    ([key, { id, value_area, value_bar }]) => ({
      id: id,
      value_area: value_area,
      value_bar: value_bar,
      time: key,
    })
  );

  const valueId = Object.values(mockData || [])?.map(item => item.id);
  const filterArea = ['전체', ...new Set(valueId)];

  return { chartData, filterArea };
};

export default useGetData;
