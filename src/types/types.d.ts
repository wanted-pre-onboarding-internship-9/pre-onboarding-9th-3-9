export interface IMockData {
  [key: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
}

export interface IChartData {
  id: string;
  value_area: number;
  value_bar: number;
  time?: string;
}

export interface ITooltip {
  active?: boolean;
  payload?: ITooltipPayload[];
}

interface ITooltipPayload {
  payload: IChartData;
}
