import { Dispatch, SetStateAction } from 'react';

export interface IData {
  [timeStamp: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
}

interface IChartProps {
  data?: IData;
  selectedData: string;
  setSelectedData: Dispatch<SetStateAction<string>>;
}
