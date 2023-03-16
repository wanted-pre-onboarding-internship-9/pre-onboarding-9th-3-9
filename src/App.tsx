import Chart from './components/Chart';
import { TChart } from './types/chartTypes';
import useMockData from './hooks/useMockData';

function App() {

  const [mockData, indexesFindId, setIndexesFindId] = useMockData();

  const { labels, ids, areas, bars }: TChart = mockData;

  const onClickTag = (id: string) => {
    const findIndexes = ids
      .map((item: string, index: number) => {
        if (item === id) return index;
        else return -1;
      })
      .filter((mapItem: number) => mapItem !== -1);

    const all = ids.map((item: string, index: number) => {
      return index;
    });

    if (id === 'all') {
      setIndexesFindId(all);
    } else {
      setIndexesFindId(findIndexes);
    }
  };

  return (
    <div>
      <Chart
        labels={labels}
        ids={ids}
        areas={areas}
        bars={bars}
        findIdx={indexesFindId}
        onClickTag={onClickTag}
      />
      <button onClick={() => onClickTag('all')}>전체</button>
      {[...new Set(ids)].map(item => (
        <button key={item} onClick={() => onClickTag(item)}>
          {item}
        </button>
      ))}
    </div>
  );
}

export default App;
