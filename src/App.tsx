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

  const [findIdx, setFindIdx] = useState<number[]>([]);

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

          setFindIdx(ids
            .map((item, index) => {
              return index;
            }));

          setCharts({ labels, ids, areas, bars });

        })
        .catch(error => {
          console.log(error);
        })
    }
  }, []);


  const onClickTag = (id: string) => {

    const findIndexes = charts.ids
      .map((item, index) => {
        if (item === id) return index;
        else return -1;
      })
      .filter((item) => item !== -1);

    const all = charts.ids
      .map((item, index) => {
        return index;
      })

    if (id === "all") {
      setFindIdx(all);
    } else {
      setFindIdx(findIndexes);
    }
  }



  return (
    <div>
      <Chart
        labels={charts.labels}
        ids={charts.ids}
        areas={charts.areas}
        bars={charts.bars}
        findIdx={findIdx}
        onClickTag={onClickTag}
      />
      <button onClick={() => onClickTag("all")}>전체</button>
      {
        [...new Set(charts.ids)].map((item) => (
          <button key={item} onClick={() => onClickTag(item)}>{item}</button>
        ))
      }

    </div>
  );
}

export default App;


