import { useEffect, useState } from 'react';

import instance from '../apis/instance';
import { convertDateToTime } from '../common/utils';
import { IData } from '../types';

const useChartData = () => {
  const [data, setData] = useState<IData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => instance.get('');
    fetchData()
      .then(({ data: { response } }) => setData(response))
      .finally(() => setIsLoading(props => !props));
  }, []);

  const dateValues = Object.keys(data);
  const areaValues = Object.values(data).map(
    properties => properties.value_area
  );
  const barValues = Object.values(data).map(properties => properties.value_bar);
  const xAxis = Object.keys(data).map(date => convertDateToTime(date));
  const regionValues = Object.values(data).map(properties => properties.id);
  const areaMaxValue = Math.max(...areaValues);
  const barMaxValue = Math.max(...barValues);
  const dedupRegions = regionValues.filter(
    (element, index) => regionValues.indexOf(element) === index
  );

  return {
    data: {
      xAxis,
      regionValues,
      areaMaxValue,
      barMaxValue,
      areaValues,
      barValues,
    },
    dateRange: [dateValues[0], dateValues[dateValues.length - 1]],
    dedupRegions,
    isLoading,
  };
};

export default useChartData;
