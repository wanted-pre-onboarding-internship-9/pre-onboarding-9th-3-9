import { useEffect, useState } from 'react';

import { chartApi } from '../apis/instance';
import { IChart } from '../types/types';

export function useChartDataState() {
  const [resData, setResData] = useState<IChart[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    chartApi()
      .then(({ data: { response } }) => setResData(response))
      .finally(() => setIsLoading(props => !props));
  }, []);

  const dateValues: string[] = Object.keys(resData);
  const areaValues: number[] = Object.values(resData).map(
    obj => obj.value_area
  );
  const barValues: number[] = Object.values(resData).map(obj => obj.value_bar);

  const idValues = Object.values(resData).map(obj => obj.id);

  const districtValues = [...new Set(idValues)];

  return {
    isLoading,
    dateValues,
    areaValues,
    barValues,
    idValues,
    districtValues,
  };
}
