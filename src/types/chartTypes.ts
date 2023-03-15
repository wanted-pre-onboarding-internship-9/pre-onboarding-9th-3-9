export type ChartData = {
  dateTimeArray: string[];
  idArray: string[];
  areaArray: YAxisData[];
  barArray: YAxisData[];
};

export type YAxisData = {
  x: string;
  y: number;
  fillColor: string;
};

export type ChartProps = {
  dateTimeArray: string[];
  idArray: string[];
  barArrayState: YAxisData[];
  areaArrayState: YAxisData[];
  handleFilter: (id: string) => void;
};

export type ItemData = {
  id: string;
  value_area: number;
  value_bar: number;
};
