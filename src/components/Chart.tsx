import ReactApexChart from 'react-apexcharts';
import { renderToString } from 'react-dom/server';

import { ChartProps } from '../types/chartTypes';
import Tooltip from './Tooltip';

const Chart = ({
  dateTimeArray,
  idArray,
  barArrayState: barArray,
  areaArrayState: areaArray,
  handleFilter,
}: ChartProps) => {
  const series = [
    {
      name: 'value_bar',
      type: 'column',
      data: barArray,
    },
    {
      name: 'value_area',
      type: 'area',
      data: areaArray,
    },
  ];

  const options = {
    stroke: {
      show: false,
    },
    chart: {
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) =>
          handleFilter(idArray[config.dataPointIndex]),
      },
    },
    markers: {
      size: 5,
    },
    labels: dateTimeArray,
    yaxis: [
      {
        title: {
          text: 'value_area',
        },
      },
      {
        opposite: true,
        title: {
          text: 'value_bar',
        },
      },
    ],
    tooltip: {
      custom: ({
        series,
        dataPointIndex,
      }: {
        series: any;
        seriesIndex: any;
        dataPointIndex: number;
        w: any;
      }) => {
        const valueId = idArray[dataPointIndex];
        const valueBar = series[0][dataPointIndex];
        const valueArea = series[1][dataPointIndex];
        return renderToString(
          <Tooltip
            data={{
              valueId,
              valueArea,
              valueBar,
            }}
          />
        );
      },
    },
  };

  return <ReactApexChart type='line' options={options} series={series} />;
};

export default Chart;
