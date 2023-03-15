import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';

import { DataAPI } from '../apis/instance';
import { IChartData, IMockData } from '../types/types';
import CustomTooltip from './CustomTooltip';

const Chart = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const valueId = Object.values(mockData || [])?.map(item => item.id);
  const filterArea: string[] = valueId.filter(
    (item, index) => valueId.indexOf(item) === index
  );
  filterArea.push('전체');

  return (
    <>
      {filterArea.map(item => (
        <StButton key={item} onClick={() => navigate('/' + item)}>
          {item}
        </StButton>
      ))}
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
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <CartesianGrid stroke='#f5f5f5' />
          <Area
            yAxisId='left'
            type='monotone'
            dataKey='value_area'
            fill='#8884d8'
            stroke='#8884d8'
          />
          <Bar dataKey='value_bar' yAxisId='right' barSize={20} fill='#413ea0'>
            {chartData?.map(item => (
              <Cell
                key={item.time}
                fill={item.id === id ? '#FFAF00' : '#413ea0'}
                onClick={() => navigate('/' + item.id)}
              />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;

const StButton = styled.button`
  border: none;
  width: 90px;
  height: 40px;
  border-radius: 12px;
  margin-right: 10px;

  :hover {
    background-color: #c8c8c8;
  }
  :focus {
    background-color: #c8c8c8;
  }
`;
