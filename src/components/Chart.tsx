import ApexChart from 'react-apexcharts';

import { convertDateToTime } from '../common/utils';
import { IChartProps } from '../types';

function Chart({ data }: IChartProps) {
  const xAxis = Object.keys(data).map(date => convertDateToTime(date));
  const areaValues = Object.values(data).map(
    properties => properties.value_area
  );
  const barValues = Object.values(data).map(properties => properties.value_bar);
  const localValues = Object.values(data).map(properties => properties.id);

  // const areaMinValue = Math.min(...areaValues);
  const barMinValue = Math.min(...barValues);
  const areaMaxValue = Math.max(...areaValues);
  const barMaxValue = Math.max(...barValues);
  const areaMinValue = Math.min(...areaValues);

  return (
    <ApexChart
      series={[
        {
          name: 'Area Values',
          type: 'area',
          data: areaValues,
        },
        {
          name: 'Bar Values',
          type: 'column',
          data: barValues,
        },
      ]}
      options={{
        series: [
          { name: 'Area Values', type: 'area', data: areaValues },
          {
            name: 'Bar Values',
            type: 'column',
            data: barValues,
          },
        ],
        chart: {
          width: '100%',
          height: '100%',
          background: 'transparent',
          type: 'area',
          stacked: true,
        },
        plotOptions: {
          bar: {
            columnWidth: '50%',
          },
        },
        xaxis: {
          categories: xAxis,
          tickAmount: Math.floor(xAxis.length / 10),
        },
        yaxis: [
          {
            title: { text: 'Area Values' },
            min: 0,
            max: areaMaxValue,
          },
          {
            opposite: true,
            title: { text: 'Bar Values' },
            min: 0,
            max: barMaxValue * 2,
          },
        ],

        tooltip: {
          x: {
            show: true,
            formatter: y => localValues[y - 1],
          },
        },
      }}
    />
  );
}

export default Chart;
