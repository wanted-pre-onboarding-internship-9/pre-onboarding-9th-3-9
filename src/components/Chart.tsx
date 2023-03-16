import ReactApexChart from 'react-apexcharts';

interface IChartProp {
  labels: string[];
  ids: string[];
  areas: number[];
  bars: number[];
  findIdx: number[];
  onClickTag: (id: string) => void;
}

const Chart = ({
  labels,
  ids,
  areas,
  bars,
  findIdx,
  onClickTag,
}: IChartProp) => {
  const series = [
    {
      name: 'bar',
      type: 'column',
      data: bars.map((value, idx) => {
        const color = findIdx.includes(idx) ? '#0d9df2' : '#cde9fc';
        return {
          x: labels[idx],
          y: value,
          fillColor: color,
        };
      }),
    },
    {
      name: 'area',
      type: 'area',
      data: areas.map((value, idx) => {
        const color = findIdx.includes(idx) ? '#00E396' : '#c6f5e5';
        return {
          x: labels[idx],
          y: value,
          fillColor: color,
        };
      }),
    },
  ];

  const options: any = {
    chart: {
      type: 'line',
      stacked: false,
      events: {
        dataPointSelection: function (
          event: any,
          chartContext: any,
          config: any
        ) {
          setTimeout(() => {
            onClickTag(ids[config.dataPointIndex] as string);
          }, 10);
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    legend: {
      show: true,
      position: 'top',
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: '#fff',
        radius: 12,
      },
    },
    fill: {
      opacity: [0.85, 0.65, 1],
      gradient: {
        inverseColors: true,
        shade: 'light',
        type: 'vertical',
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    dataLabels: {
      style: {
        colors: ['#113dcf', '#089e53'],
      },
      enabled: true,
      enabledOnSeries: [0, 1],
    },
    noData: {
      text: 'No Data',
    },

    labels: labels,
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#008FFB',
        },
        labels: {
          style: {
            color: '#008FFB',
            fontWeight: 600,
          },
        },
        title: {
          text: 'bar',
          style: {
            color: '#008FFB',
          },
          rotate: 0,
          offsetX: -10,
          offsetY: -115,
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#00E396',
        },
        labels: {
          style: {
            color: '#00E396',
            fontWeight: 600,
          },
        },
        title: {
          text: 'area',
          style: {
            color: '#00E396',
          },
          rotate: 0,
          offsetX: 10,
          offsetY: -115,
        },
        forceNiceScale: true,
        min: 0,
        max: Math.max(...areas) * 2,
        tickAmount: 4,
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        show: true,
        formatter: function (x: any, { dataPointIndex }: any) {
          if (typeof dataPointIndex !== 'undefined') return ids[dataPointIndex];
        },
      },
      y: {
        formatter: function (y: any) {
          if (typeof y !== 'undefined') {
            return y.toFixed(0) + ' points';
          }
          return y;
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type='bar'
      background={'#ffffff13'}
      width='100%'
      height='100%'
    />
  );
};

export default Chart;
