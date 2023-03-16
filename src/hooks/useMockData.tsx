import { useEffect, useState } from 'react';

import instance from '../apis/instance';

function useMockData() {
  const [charts, setCharts] = useState<any>({
    labels: [],
    ids: [],
    areas: [],
    bars: [],
  });

  const [indexesFindId, setIndexesFindId] = useState<number[]>([]);

  useEffect(() => {
    instance
      .get('')
      .then(response => {
        const responseData = response.data.response;

        const labels = Object.keys(responseData) as string[];
        const ids = Object.values(responseData).map(
          (item: any) => item.id as string
        );
        const areas = Object.values(responseData).map(
          (item: any) => item.value_area as number
        );
        const bars = Object.values(responseData).map(
          (item: any) => item.value_bar as number
        );

        setIndexesFindId(
          ids.map((item, index) => {
            return index;
          })
        );

        setCharts({ labels, ids, areas, bars });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return [charts, indexesFindId, setIndexesFindId];
}

export default useMockData;
