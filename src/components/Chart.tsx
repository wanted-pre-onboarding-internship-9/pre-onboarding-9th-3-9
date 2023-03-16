import ReactApexChart from 'react-apexcharts';

type TChartProp = {
  labels: string[];
  ids: string[];
  areas: number[];
  bars: number[];
  findIdx: number[];
  onClickTag: (id: string) => void;
};

const Chart = ({
  labels,
  ids,
  areas,
  bars,
  findIdx,
  onClickTag,
}: TChartProp) => {
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
        const color = findIdx.includes(idx) ? '#0d9df2' : '#cde9fc';
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
      id: 'mychart',
      height: 350,
      type: 'line',
      stacked: false,
      events: {
        click: function (
          event: any,
          chartContext: any,
          config: any
        ) {
          if (config.dataPointIndex !== -1) {
            onClickTag(ids[config.dataPointIndex] as string);
          }
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    legend: {
      show: false,
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
    <ReactApexChart options={options} series={series} type='bar' height={350} />
  );
};

export default Chart;
