import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import instance from '../apis/instance';
import {
  ChartDataType,
  ChartPropsType,
  ResponseDataType,
  initAnnotationDataType,
  timeIdObjType,
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

const initAnnotationData = {
  x: undefined,
  opacity: 0.2,
  strokeDashArray: 0,
  borderColor: '#A5978B',
  label: {
    style: {
      color: '#fff',
      background: '#A5978B',
    },
    text: '',
  },
};

const options: ApexOptions = {
  chart: {
    height: 350,
    type: 'line',
    stacked: false,
  },
  annotations: {
    xaxis: [],
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
  labels: [],
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
  const [timeIdObj, setTimeIdObj] = useState<timeIdObjType[]>([]);

  const calcXaxis = () => {
    const [data] = timeIdObj.filter(
      (item: timeIdObjType) => item.selected === selectedId
    );
    return data.value.map(item => ({
      ...initAnnotationData,
      x: item,
      label: { ...initAnnotationData.label, text: selectedId },
    }));
  };

  const changeOptionColor = (callback: () => initAnnotationDataType[]) => {
    if (selectedId !== '전체') {
      const selectedData = callback();
      setChartOptions({
        ...chartOptions,
        annotations: { xaxis: [...selectedData] },
      });
    }
  };

  const getInstance = async () => {
    const data = await instance.get('');
    const response = data.data.response;
    const series: ResponseDataType[] = Object.values(response);
    const timeXaxis = Object.keys(response).map(
      (value: string) => value.split(' ')[1]
    );
    setChartOptions({ ...options, labels: [...timeXaxis] });
    const value_area = series.map(
      (value: ResponseDataType) => value.value_area
    );
    const value_bar = series.map((value: ResponseDataType) => value.value_bar);
    value_bar.push(0);
    const barData = { ...initBarData, data: [...value_bar] };
    const areaData = { ...initAreaData, data: [...value_area] };
    const objData: ChartDataType = { series: [] };
    const tmpData = [barData];
    tmpData.push(areaData);
    objData.series = [...tmpData];
    const value_id = series.map((value: ResponseDataType) => value.id);

    const dataId = new Set(value_id);
    const buttonId = Array.from(dataId);
    const timeIdObj = buttonId.map(value => ({ selected: value, value: [''] }));

    for (let i = 0; i < buttonId.length; i += 1) {
      const tmp = timeXaxis.filter(
        (_, index) => value_id[index] === buttonId[i]
      );
      timeIdObj[i].value = [...tmp];
    }

    setTimeIdObj([...timeIdObj]); //useState 안해도 될듯

    setChartData(objData);
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
    getInstance().then(() => {
      changeOptionColor(calcXaxis);
    });
  }, []);

  useEffect(() => {
    changeOptionColor(calcXaxis);
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
