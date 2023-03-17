import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { renderToString } from 'react-dom/server';
import { useNavigate, useParams } from 'react-router-dom';

import { commaPerThousand } from '../common/utils';
import { useChartData } from '../hooks/useChartData';
import { YAxisData } from '../types/chartTypes';
import Tooltip from './Tooltip';

const Chart = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { dateTimeArray, idArray, areaArray, barArray } = useChartData();
  const [barArrayState, setBarArrayState] = useState<YAxisData[]>([]);
  const [areaArrayState, setAreaArrayState] = useState<YAxisData[]>([]);

  useEffect(() => {
    if (id !== '전체') {
      const highlightedBarArray = barArray.map((barData, index) => {
        const fillColor =
          idArray[index] === id
            ? 'rgba(0, 142, 250, 0.52)'
            : 'rgba(0, 0, 0, 0.15)';
        return { ...barData, fillColor };
      });
      const highlightedAreaArray = areaArray.map((areaData, index) => {
        const fillColor =
          idArray[index] === id ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.15)';
        return { ...areaData, fillColor };
      });
      setBarArrayState([...highlightedBarArray]);
      setAreaArrayState([...highlightedAreaArray]);
    } else {
      setBarArrayState(barArray);
      setAreaArrayState(areaArray);
    }
  }, [id, barArray, areaArray, idArray]);

  const series = [
    {
      name: 'value_bar',
      type: 'column',
      data: barArrayState,
    },
    {
      name: 'value_area',
      type: 'area',
      data: areaArrayState,
    },
  ];

  const options = {
    colors: ['rgba(0, 142, 250, 0.52)', '#00E396'],
    stroke: {
      show: false,
    },
    chart: {
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) =>
          navigate(`/${idArray[config.dataPointIndex]}`),
      },
    },
    markers: {
      size: 4,
    },
    labels: dateTimeArray,
    yaxis: [
      {
        opposite: true,
        title: {
          text: 'value_bar',
        },
        labels: {
          formatter: (value: number) => commaPerThousand(Math.floor(value)),
        },
      },
      {
        max: 200,
        colors: ['#000000', '#000000'],
        title: {
          text: 'value_area',
        },
        labels: {
          formatter: (value: number) => commaPerThousand(Math.floor(value)),
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
