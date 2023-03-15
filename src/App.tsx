import { useEffect, useState } from 'react';

import mockData from './apis/instance';
import Chart from './components/Chart';
import { TChart } from './types/chartTypes';

function App() {

  const [charts, setCharts] = useState<TChart>({
    labels: [],
    ids: [],
    areas: [],
    bars: [],
  });

  let isInit = false;

  useEffect(() => {
    if (!isInit) {
      isInit = true;

      mockData.get('')
        .then(response => {
          const responseData = response.data.response;

          const labels = Object.keys(responseData) as string[];
          const ids = Object.values(responseData).map((item: any) => item.id as string);
          const areas = Object.values(responseData).map((item: any) => item.value_area as number);
          const bars = Object.values(responseData).map((item: any) => item.value_bar as number);

          setCharts({ labels, ids, areas, bars });
        })
        .catch(error => {
          console.log(error);
        })
    }
  }, []);

  const [stateFill, setStateFill] = useState<any>({
    opacity: [0.85, 0.65, 1],
    gradient: {
      inverseColors: true,
      shade: 'light',
      type: 'vertical',
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100],
    },
  });

  const onClickTag = (id: string) => {

    const findIndexes = charts.ids
      .map((item, index) => {
        if (item === id) return index;
        else return -1;
      })
      .filter((item) => item !== -1);

    const cfill = {
      opacity: [0.85, 0.65, 1],
      colors: [function ({ dataPointIndex, seriesIndex }: any) {

        if (findIndexes.includes(dataPointIndex)) {
          if (seriesIndex === 0) {
            return '#0d9df2'
          } else {
            return '#59edbb'
          }
        } else {
          if (seriesIndex === 0) {
            return '#cde9fc'
          } else {
            return '#e5fcf4'
          }
        }

      }],
    }

    setStateFill(cfill)
  }

  return (
    <div>
      <Chart
        labels={charts.labels}
        ids={charts.ids}
        areas={charts.areas}
        bars={charts.bars}
        fill={stateFill}
        onClickTag={onClickTag}
      />
      {
        [...new Set(charts.ids)].map((item) => (
          <button key={item} onClick={() => onClickTag(item)}>{item}</button>
        ))
      }

    </div>
  );
}

export default App;


