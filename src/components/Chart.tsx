import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import instance from '../apis/instance';
import {
  ChartDataType,
  ChartPropsType,
  ResponseDataType,
  SeriesType,
} from '../common/Types';

const initBarData = {
  name: 'Bar',
  type: 'column',
  data: [],
};

const initAreaData = {
  name: 'Area',
  type: 'area',
  data: [],
};

const options: ApexOptions = {
  chart: {
    //전체 차트 옵션
    height: 350,
    type: 'line',
    stacked: false,
  },
  stroke: {
    width: [0, 2, 5],
    curve: 'smooth',
  },
  plotOptions: {
    bar: {
      columnWidth: '70%',
    },
  },
  fill: {
    colors: ['#2E93fA', '#66DA26'],
    opacity: [0.3, 0.3],
    gradient: {
      inverseColors: false,
      shade: 'darker',
      type: 'vertical',
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100],
    },
  },
  labels: [
    // label 채우기
  ],
  markers: {
    size: 0,
  },
  xaxis: {
    type: 'category',
  },
  yaxis: [
    {
      opposite: true,
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#008FFB',
      },
      labels: {
        style: {
          colors: '#008FFB',
        },
      },
      title: {
        text: 'Bar',
        style: {
          color: '#008FFB',
        },
      },
    },
    {
      max: 200,
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#00E396',
      },
      labels: {
        style: {
          colors: '#00E396',
        },
      },
      title: {
        text: 'Area',
        style: {
          color: '#00E396',
        },
      },
    },
  ],
  tooltip: {
    custom: undefined,
  },
};

function Chart(props: ChartPropsType) {
  const { selectedId } = props;
  const [chartData, setChartData] = useState<ChartDataType>();
  const [chartOptions, setChartOptions] = useState(options);
  const [idArray, setIdArray] = useState<string[]>([]);

  const changeOptionColor = () => {
    if (selectedId === '') {
      if (options.fill) {
        // setChartOptions({
        //   ...chartOptions,
        //   fill: {
        //     ...chartOptions.fill,
        //     colors: [
        //       '#2E93fA',
        //       '#66DA26',
        //       // function (value: any, seriesIndex: number, w: any) {
        //       //   if (idArray[seriesIndex] === selectedId) {
        //       //     console.log(seriesIndex);
        //       //     return '#000000';
        //       //   } else {
        //       //     return '#000000';
        //       //   }
        //       // },
        //     ],
        //   },
        // });
        // options.fill.colors = ['#E91E63', '#E91E63'];
      }
    }
    if (selectedId !== '') {
      if (options.fill) {
        // setChartOptions({
        //   ...options,
        //   fill: { ...options.fill, colors: ['#E91E63', '#E91E63'] },
        // });
        // setChartOptions({
        //   ...chartOptions,
        //   fill: {
        //     ...chartOptions.fill,
        //     colors: [
        //       '#E91E63',
        //       '#FF9800',
        //       // function (value: any, seriesIndex: number, w: any) {
        //       //   if (idArray[seriesIndex] === selectedId) {
        //       //     console.log(seriesIndex);
        //       //     return '#000000';
        //       //   } else {
        //       //     return '#000000';
        //       //   }
        //       // },
        //     ],
        //   },
        // });
        // options.fill.colors = ['#E91E63', '#E91E63'];
      }
    }
  };

  const getInstance = async () => {
    const data = await instance.get('');
    const response = data.data.response;
    const series: ResponseDataType[] = Object.values(response);
    const timeXaxis = Object.keys(response).map(
      (value: string) => value.split(' ')[1]
    );
    console.log(timeXaxis, options, chartOptions);
    setChartOptions({ ...options, labels: [...timeXaxis] });
    const value_area = series.map(
      (value: ResponseDataType) => value.value_area
    );
    const value_bar = series.map((value: ResponseDataType) => value.value_bar);
    const barData = { ...initBarData, data: [...value_bar] };
    const areaData = { ...initAreaData, data: [...value_area] };
    const objData: ChartDataType = { series: [] };
    const tmpData = [barData];
    tmpData.push(areaData);
    objData.series = [...tmpData];
    const value_id = series.map((value: ResponseDataType) => value.id);
    setIdArray([...value_id]);
    setChartData(objData);
    console.log(objData);
    if (options.tooltip) {
      options.tooltip.custom = function ({
        series,
        seriesIndex,
        dataPointIndex,
        w,
      }) {
        return (
          '<div>' +
          '<span>' +
          value_id[dataPointIndex] +
          '</span>' +
          '<p>' +
          value_bar[dataPointIndex] +
          '</p>' +
          '<p>' +
          value_area[dataPointIndex] +
          '</p>' +
          '</div>'
        );
      };
    }
  };
  useEffect(() => {
    getInstance().then(() => changeOptionColor());
  }, []);

  useEffect(() => {
    changeOptionColor();
  }, [selectedId]);

  if (chartData) {
    return (
      <div id='chart'>
        <ReactApexChart options={chartOptions} series={chartData.series} />
      </div>
    );
  }

  return <div />;
}
export default Chart;
