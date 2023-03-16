import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import type {
  ChartType,
  ScriptableLineSegmentContext,
  TooltipItem,
} from 'chart.js';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Chart, getElementsAtEvent } from 'react-chartjs-2';
import styled from 'styled-components';

import { useSearchParamsState } from '../hooks/useParams';
import { IChart } from '../types/types';

ChartJS.register(
  BarElement,
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

type ChartProps = {
  date: string[];
  chartData: IChart[];
};
type TooltipType = TooltipItem<ChartType>;

const changeAllColor = (chartData: IChart[], activeColor: string): string[] =>
  chartData.map(() => activeColor);

const changeColor = (
  chartData: IChart[],
  searchParamsState: string,
  activeColor: string,
  defaultColor: string
): string[] =>
  chartData.map(item =>
    item.id === searchParamsState ? activeColor : defaultColor
  );

export default function MixedChart(props: ChartProps) {
  const { date, chartData = [] } = props;

  const { searchParamsState, setSearchParamsState } = useSearchParamsState({
    searchParamName: 'id',
  });

  const [areaColor, setAreaColor] = useState<string[]>([]);
  const [barColor, setBarColor] = useState<string[]>([]);

  const idArr = chartData.map(el => el.id);
  const barArr = chartData.map(el => el.value_bar);
  const areaArr = chartData.map(el => el.value_area);

  useEffect(() => {
    if (!chartData && !searchParamsState) return;
    searchParamsState === '전체' &&
      (setBarColor(changeAllColor(chartData, 'rgba(23,70,162 ,0.9)')),
      setAreaColor(changeAllColor(chartData, 'rgba(64,192,36 ,1)')));
    searchParamsState !== '전체' &&
      setBarColor(
        changeColor(
          chartData,
          searchParamsState,
          'rgba(23, 70, 162, 0.9)',
          'rgba(23, 70, 162, 0.3)'
        )
      );
  }, [searchParamsState, chartData]);

  const chartRef = useRef();
  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;
    if (!chart) return;
    if (getElementsAtEvent(chart, event).length > 0) {
      const clickPointIdx = getElementsAtEvent(chart, event)[0].index;
      setSearchParamsState(idArr[clickPointIdx]);
    }
  };

  const data = {
    labels: date,
    datasets: [
      {
        type: 'line' as const,
        label: 'area',
        axis: 'y',
        data: areaArr,
        fill: true,
        backgroundColor: areaColor,
        pointBorderColor: areaColor,
        tension: 0.4,
        id: idArr,
        pointBorderWidth: 7,
        hoverBorderWidth: 20,
        segment: {
          backgroundColor: (ctx: ScriptableLineSegmentContext) => {
            const findIdx = ctx.p0DataIndex;
            if (searchParamsState === '전체') return 'rgba(64,192,36 ,1)';
            else
              return idArr[findIdx] === searchParamsState
                ? 'rgba(64,192,36 ,1)'
                : 'rgba(64,192,36 ,0.2)';
          },
        },
      },
      {
        type: 'bar' as const,
        label: 'bar',
        yAxisID: 'y1',
        data: barArr,
        backgroundColor: barColor,
        tension: 0.4,
        id: idArr,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        max: Math.max(...areaArr) * 2,
        pointRadius: 5,
        pointHoverRadius: 15,
        title: {
          display: true,
          text: 'area',
        },
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        title: {
          display: true,
          text: 'bar',
        },
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    tooltip: {
      mode: 'index' as const,
    },
    interaction: {
      mode: 'index' as const,
    },
    plugins: {
      tooltip: {
        displayColors: false,
        caretSize: 20,
        backgroundColor: '#fff',
        bodyColor: '#000',
        borderColor: '#000',
        borderWidth: 1,
        padding: 20,
        titleColor: '#000',
        callbacks: {
          afterBody: (tooltipItem: TooltipType[]): string =>
            `id: ${idArr[tooltipItem[0].dataIndex]}`,
        },
        titleFont: {
          size: 30,
        },
        bodyFont: {
          size: 15,
        },
      },
    },
  };

  return (
    <Base>
      <Container>
        <Chart
          type='bar'
          options={options}
          data={data}
          onClick={onClick}
          ref={chartRef}
        />
      </Container>
    </Base>
  );
}

const Base = styled.div``;
const Container = styled.div``;
