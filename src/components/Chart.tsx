import { useEffect, useState } from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { DataAPI } from '../apis/instance';
import { IChartData, IMockData } from '../types/types';

const Chart = () => {
  const [mockData, setMockData] = useState<IMockData>();
  const getData = () => {
    DataAPI.getData().then(res => {
      setMockData(res.data.response);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const chartData: IChartData[] = Object.entries(mockData || [])?.map(
    ([key, { id, value_area, value_bar }]) => ({
      id: id,
      value_area: value_area,
      value_bar: value_bar,
      time: key,
    })
  );
  const id = Object.values(mockData || [])?.map(item => item.id);

  return (
    <ResponsiveContainer width='100%' height={500}>
      <ComposedChart
        data={chartData}
        margin={{
          top: 20,
          right: 60,
          left: 60,
          bottom: 10,
        }}>
        <XAxis dataKey='time' />
        <YAxis
          dataKey='value_bar'
          yAxisId='right'
          orientation='right'
          label={{
            value: 'Bar',
            angle: 90,
            position: 'insideRight',
          }}
        />
        <YAxis
          dataKey='value_area'
          yAxisId='left'
          label={{
            value: 'Area',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke='#f5f5f5' />
        <Area
          yAxisId='left'
          type='monotone'
          dataKey='value_area'
          fill='#8884d8'
          stroke='#8884d8'
        />
        <Bar dataKey='value_bar' yAxisId='right' barSize={20} fill='#413ea0' />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
