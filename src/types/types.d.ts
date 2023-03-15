export interface IChart {
  id: string;
  value_area: number;
  value_bar: number;
}

export type TResponse = { [key: string]: IChart };

export interface IListResponse {
  type: string;
  version: number;
  response: TResponse;
}
