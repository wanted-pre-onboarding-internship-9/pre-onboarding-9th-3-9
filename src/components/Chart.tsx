import { useSearchParams } from 'react-router-dom';
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

import useGetData from '../hooks/useGetData';
import CustomTooltip from './CustomTooltip';

const Chart = () => {
  const { chartData, filterArea } = useGetData();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <StWrap>
      <h1>Flexsys</h1>
      {filterArea.map(area => (
        <StButton key={area} onClick={() => setSearchParams({ id: area })}>
          {area}
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
            tickCount={10}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <CartesianGrid stroke='#dcdcdc' />
          <Bar
            dataKey='value_bar'
            yAxisId='right'
            barSize={20}
            fill='#413ea0'
            fillOpacity={0.5}>
            {chartData?.map(area => (
              <Cell
                key={area.time}
                fill={
                  area.id === searchParams.get('id') ? '#FFAF00' : '#413ea0'
                }
                fillOpacity={area.id === searchParams.get('id') ? 1 : 0.5}
                onClick={() => setSearchParams({ id: area.id })}
              />
            ))}
          </Bar>
          <Area
            yAxisId='left'
            type='monotone'
            dataKey='value_area'
            fill='#14148C'
            stroke='#8884d8'
          />
        </ComposedChart>
      </ResponsiveContainer>
    </StWrap>
  );
};

export default Chart;

const StWrap = styled.div`
  text-align: center;
`;

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
