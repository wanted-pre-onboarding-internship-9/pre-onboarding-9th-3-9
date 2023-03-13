import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import { getChartApi } from '../apis/chartApi';
import { IChartNestedObjects, IChartSingleObject } from '../types/chartTypes';

const Chart = () => {
  const [chartNestedObjects, setChartNestedObjects] =
    useState<IChartNestedObjects>();

  useEffect(() => {
    getChartApi().then(response => {
      setChartNestedObjects(response);
    });
  }, []);

  const valueAreaArray: number[] = chartNestedObjects
    ? Object.values(chartNestedObjects).map(
        (item: IChartSingleObject) => item.value_area
      )
    : [];

  const valueBarArray: number[] = chartNestedObjects
    ? Object.values(chartNestedObjects).map(
        (item: IChartSingleObject) => item.value_bar
      )
    : [];

  const dateTimeArray = chartNestedObjects
    ? Object.keys(chartNestedObjects)
    : [];

  const series = [
    {
      name: 'value_bar',
      type: 'column',
      data: valueBarArray,
    },
    {
      name: 'value_area',
      type: 'area',
      data: valueAreaArray,
    },
  ];

  const options = {
    fill: {
      type: 'solid',
      opacity: [0.35, 1],
    },
    labels: dateTimeArray,
    markers: {
      size: 0,
    },
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
      custom({
        series,
        seriesIndex,
        dataPointIndex,
        w,
      }: {
        series: any[];
        seriesIndex: number;
        dataPointIndex: number;
        w: any;
      }) {
        const tooltipContent =
          chartNestedObjects && dateTimeArray[dataPointIndex]
            ? `<ul>
            <li><p>id</p>: ${
              chartNestedObjects[dateTimeArray[dataPointIndex]].id
            }</li>
            <li><p>value_area</p>: '${series[0][dataPointIndex]}'</li>
            <li><p>value_bar</p>: '${series[1][dataPointIndex]}'</li>
          </ul>`
            : '';
        return tooltipContent;
      },
    },
  };

  return <ReactApexChart type='line' options={options} series={series} />;
};

export default Chart;
