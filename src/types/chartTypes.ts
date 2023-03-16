export type TChart = {
  labels: string[];
  ids: string[];
  areas: number[];
  bars: number[];
};

export type TUseMockData = {
  charts: TChart;
  indexesFindId?: number[];
  setIndexesFindId?: React.Dispatch<React.SetStateAction<number[]>>;
}