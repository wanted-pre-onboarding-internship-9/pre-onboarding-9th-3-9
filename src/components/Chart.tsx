import ReactApexChart from 'react-apexcharts';
import { renderToString } from 'react-dom/server';

import { useChartData } from '../hooks/useChartData';
import Tooltip from './Tooltip';

const Chart = () => {
  const { dateTimeArray, idArray, areaArray, barArray } = useChartData();

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
      custom: ({ dataPointIndex }: { dataPointIndex: number }) => {
        return renderToString(
          <Tooltip
            data={{
              id: idArray[dataPointIndex],
              area: barArray[dataPointIndex],
              bar: barArray[dataPointIndex],
            }}
          />
        );
      },
    },
  };

  return <ReactApexChart type='line' options={options} series={series} />;
};

export default Chart;
