import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { chartApi } from '../apis/instance';
import Filter from '../components/Filter';
import MixedChart from '../components/MixedChart';
import { IChart, IListResponse } from '../types/types';

function sortDate(list: [string, IChart][]) {
  const sorted_list = list.sort(function (a, b) {
    return new Date(a[0]).getTime() - new Date(b[0]).getTime();
  });
  return sorted_list;
}

export default function Home() {
  const [districts, setDistrict] = useState<string[]>([]);
  const [date, setDate] = useState<string[]>([]);
  const [chartData, setChartData] = useState<IChart[]>([]);

  const getChart = async () => {
    const response: AxiosResponse<IListResponse> = await chartApi();
    const data = response.data.response;

    const chart = Object.entries(data);
    setDate(sortDate(chart).map(date => date[0])); // 시간데이터
    setChartData(sortDate(chart).map(date => date[1])); // 차트데이터

    const district: string[] = ['전체'];
    new Set(chart.map(x => x[1].id)).forEach(
      el => !district.includes(el) && district.push(el)
    );
    setDistrict(district); // 지역구 데이터
  };

  useEffect(() => {
    getChart();
  }, []);

  return (
    <Main>
      <Section>
        <Title>Date Chart</Title>
        <ChartContents className='chart-section'>
          <Filter districts={districts} />
          <MixedChart date={date} chartData={chartData} />
        </ChartContents>
      </Section>
    </Main>
  );
}

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 20px 150px;
  box-sizing: border-box;
  background: linear-gradient(-45deg, #084464, #000101, #433abe);
  background-size: 300% 300%;
  animation: move-background 20s ease-in-out infinite;
  color: #fff;
  @keyframes move-background {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
const Section = styled.section`
  border: 5px solid #e0e0e0;
  border-radius: 17px;
  margin: 0 auto;
  padding: 20px 40px;
  box-sizing: border-box;
`;
const ChartContents = styled.div``;
const Title = styled.h1``;
