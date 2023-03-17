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

export interface timeIdObjType {
  selected: string;
  value: string[];
}

export interface initAnnotationRangeDataType {
  x: string;
  x2: string;
  fillColor: string;
  opacity: number;
}

export interface initAnnotationDataType {
  x: string;
  borderColor: string;
  strokeDashArray: number;
  opacity: number;
  label: annotationLabelType;
}

export interface annotationLabelType {
  style: annotationStyleType;
  text: string;
}

export interface annotationStyleType {
  color: string;
  background: string;
}
