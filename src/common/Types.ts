export interface ChartDataType {
  series: SeriesType[];
}

export interface SeriesType {
  name: string;
  type: string;
  data: number[];
}
export interface ResponseTotalDataType {
  date: ResponseDataType;
}
export interface ResponseDataType {
  id: string;
  value_area: number;
  value_bar: number;
}

export interface FilterPropsType {
  onClick: (target: string) => void;
}

export interface ChartPropsType {
  selectedId: string;
}
