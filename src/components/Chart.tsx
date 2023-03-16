import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { renderToString } from 'react-dom/server';
import { useNavigate, useParams } from 'react-router-dom';

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
        const fillColor = idArray[index] === id ? '#fb00a6' : '#008FFB';
        return { ...barData, fillColor };
      });
      const highlightedAreaArray = areaArray.map((areaData, index) => {
        const fillColor = idArray[index] === id ? '#fb00a6' : '#26E7A6';
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
