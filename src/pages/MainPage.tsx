import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button';
import Chart from '../components/Chart';
import useMockData from '../hooks/useMockData';
import { TChart } from '../types/chartTypes';

const MainPage = () => {
  const [mockData, indexesFindId, setIndexesFindId] = useMockData();

  const { labels, ids, areas, bars }: TChart = mockData;

  const tags = [...new Set(ids)];

  const [searchParams, setSearchParams] = useSearchParams('all');

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

    setSearchParams({ id });

    if (id === 'all') {
      setIndexesFindId(all);
    } else {
      setIndexesFindId(findIndexes);
    }
  };

  return (
    <StMainWrap>
      <StChartWrap>
        <Chart
          labels={labels}
          ids={ids}
          areas={areas}
          bars={bars}
          findIdx={indexesFindId}
          onClickTag={onClickTag}
        />
      </StChartWrap>
      <StTagWrap>
        <Button
          text='전체'
          onClick={() => onClickTag('all')}
          isOn={'all' === (searchParams.get('id') || 'all')}
        />
        {tags.map(tag => (
          <Button
            key={tag}
            text={tag}
            onClick={() => onClickTag(tag)}
            isOn={tag === searchParams.get('id')}
          />
        ))}
      </StTagWrap>
    </StMainWrap>
  );
};

export default MainPage;

const StMainWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StChartWrap = styled.div`
  width: 100%;
  height: 60%;
  background-color: '#1111';
`;

const StTagWrap = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
