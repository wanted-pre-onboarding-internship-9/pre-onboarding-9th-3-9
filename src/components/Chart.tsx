import ApexChart from 'react-apexcharts';

import { commaPerThousand, convertDateToTime } from '../common/utils';
import { IChartProps } from '../types';

function Chart({
  data = {
    dateValues: [],
    regionValues: [],
    areaValues: [],
    barValues: [],
    areaMaxValue: 0,
    barMaxValue: 0,
  },
  selectedData = null,
  setSelectedData,
}: IChartProps) {
  const {
    dateValues,
    areaValues,
    barValues,
    regionValues,
    areaMaxValue,
    barMaxValue,
  } = data;

  const areaData = areaValues.map((value, index) => {
    return {
      x: dateValues[index],
      y: value,
    };
  });

  const barData = barValues.map((value, index) => {
    const color =
      regionValues[index] === selectedData ? '#ff000060' : '#0074d960';
    return {
      x: dateValues[index],
      y: value,
      fillColor: color,
      strokeColor: color,
    };
  });

  return (
    <ApexChart
      width='100%'
      height='100%'
      series={[
        {
          name: 'Bar Values',
          type: 'column',
          data: barData,
        },
        {
          name: 'Area Values',
          type: 'area',
          data: areaData,
        },
      ]}
      options={{
        stroke: { curve: 'smooth', width: 0 },
        fill: {
          type: 'gradient',
          gradient: {
            gradientToColors: ['#ffffff'],
            stops: [0, 100],
          },
        },
        chart: {
          background: 'transparent',
          zoom: { enabled: false },
          toolbar: { show: false },
          events: {
            click: function (event, chartContext, config) {
              if (config.seriesIndex !== -1) {
                setSelectedData(regionValues[config.dataPointIndex]);
              }
            },
          },
        },

        plotOptions: {
          bar: {
            columnWidth: '70%',
          },
          area: {
            fillTo: 'origin',
          },
        },
        xaxis: {
          labels: {
            show: true,
            style: {
              colors: '#ffffff',
              fontSize: '12px',
            },
            formatter: value => convertDateToTime(value),
          },
          tooltip: { enabled: false },
          tickAmount: Math.floor(dateValues.length / 3),
        },
        yaxis: [
          {
            seriesName: 'Bar Values',
            axisTicks: {
              show: true,
              color: 'white',
            },
            axisBorder: {
              show: true,
              color: '#0074D9',
            },
            labels: {
              show: true,
              style: {
                colors: '#ffffff',
                fontWeight: 600,
                fontSize: '13px',
              },
              formatter: value => commaPerThousand(Math.floor(value)),
            },
            forceNiceScale: true,
            title: {
              text: 'Bar',
              style: {
                color: '#0074D9',
              },
            },
            opposite: true,
            min: 0,
            max: barMaxValue,
            tickAmount: 4,
          },
          {
            seriesName: 'Area Values',
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#3ebe73',
            },
            labels: {
              show: true,
              style: {
                colors: '#ffffff',
                fontWeight: 600,
                fontSize: '13px',
              },
              formatter: value => commaPerThousand(Math.floor(value)),
            },
            title: {
              text: 'Area',
              style: {
                color: '#3ebe73',
              },
            },
            forceNiceScale: true,
            min: 0,
            max: areaMaxValue * 2,
            tickAmount: 4,
          },
        ],
        legend: {
          labels: { colors: '#ffffff' },
          fontSize: '15px',
          fontWeight: 600,
        },

        tooltip: {
          x: {
            show: true,
            formatter: x => `${regionValues[x - 1]} (${dateValues[x]})`,
          },
        },
      }}
    />
  );
}

export default Chart;
