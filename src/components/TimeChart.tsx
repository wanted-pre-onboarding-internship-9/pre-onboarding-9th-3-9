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

import { useSearchParamsState } from '../hooks/useSearchParamsState';
import { theme } from '../styles/theme';

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
  dateValues: string[];
  idValues: string[];
  areaValues: number[];
  barValues: number[];
};
type ChartTooltip = TooltipItem<ChartType>;

export default function TimeChart(props: ChartProps) {
  const { dateValues, idValues, areaValues, barValues } = props;
  const { searchParamsState, setSearchParamsState } = useSearchParamsState({
    searchParamName: 'id',
    defaultValue: '전체',
  });
  console.log(searchParamsState);
  const [areaColor, setAreaColor] = useState<string[]>([]);
  const [barColor, setBarColor] = useState<string[]>([]);

  useEffect(() => {
    if (!searchParamsState) return;
    if (searchParamsState === '전체') {
      setAreaColor(idValues.map(() => `${theme.rgba.green_active}`));
      setBarColor(idValues.map(() => `${theme.rgba.blue_active}`));
    } else {
      setAreaColor(
        idValues.map(id =>
          id === searchParamsState
            ? `${theme.rgba.green_active}`
            : `${theme.rgba.green_default}`
        )
      );
      setBarColor(
        idValues.map(id =>
          id === searchParamsState
            ? `${theme.rgba.blue_active}`
            : `${theme.rgba.blue_default}`
        )
      );
    }
  }, [idValues, searchParamsState]);

  const chartRef = useRef();
  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;
    if (!chart) return;
    if (getElementsAtEvent(chart, event).length > 0) {
      const clickPointIdx = getElementsAtEvent(chart, event)[0].index;
      setSearchParamsState(idValues[clickPointIdx]);
    }
  };

  const data = {
    labels: dateValues,
    datasets: [
      {
        type: 'line' as const,
        label: 'area',
        axis: 'y',
        data: areaValues,
        fill: true,
        backgroundColor: areaColor,
        pointBorderColor: areaColor,
        tension: 0.4,
        id: idValues,
        pointBorderWidth: 5,
        hoverBorderWidth: 20,
        segment: {
          backgroundColor: (ctx: ScriptableLineSegmentContext) => {
            const findIdx = ctx.p0DataIndex;
            return areaColor[findIdx];
          },
        },
      },
      {
        type: 'bar' as const,
        label: 'bar',
        yAxisID: 'y1',
        data: barValues,
        backgroundColor: barColor,
        tension: 0.4,
        id: idValues,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        ticks: {
          color: `${theme.color.white}`,
        },
      },
      y: {
        ticks: {
          color: `${theme.color.white}`,
        },
        title: {
          display: true,
          text: 'area',
          color: `${theme.color.white}`,
        },
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        max: Math.max(...areaValues) * 2,
        pointRadius: 5,
        pointHoverRadius: 15,
      },
      y1: {
        ticks: {
          color: `${theme.color.white}`,
        },
        title: {
          display: true,
          text: 'bar',
          color: `${theme.color.white}`,
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
      colors: {
        enabled: false,
      },
      tooltip: {
        displayColors: false,
        caretSize: 20,
        backgroundColor: `${theme.color.white}`,
        bodyColor: `${theme.color.black}`,
        borderColor: `${theme.color.black}`,
        borderWidth: 1,
        padding: 20,
        titleColor: `${theme.color.black}`,
        callbacks: {
          afterBody: (tooltipItem: ChartTooltip[]): string =>
            `id: ${idValues[tooltipItem[0].dataIndex]}`,
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
