import { SetURLSearchParams } from 'react-router-dom';

interface IData {
  [timeStamp: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
}

interface IChartProps {
  data?: IData;
  selectedData: string | null;
  setSelectedData: SetURLSearchParams;
}
