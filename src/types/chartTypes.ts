export interface IChartSingleObject {
  id: string;
  value_area: number;
  value_bar: number;
}

export interface IChartNestedObjects {
  [key: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
}
