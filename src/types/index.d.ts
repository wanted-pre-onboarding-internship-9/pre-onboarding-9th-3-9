import { SetURLSearchParams } from 'react-router-dom';

interface IData {
  [timeStamp: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
}

interface IChartData {
  dateValues: string[];
  regionValues: string[];
  areaMaxValue: number;
  barMaxValue: number;
  areaValues: number[];
  barValues: number[];
}

interface IChartProps {
  data: IChartData;
  selectedData: string | null;
  setSelectedData: SetURLSearchParams;
}

interface IButtonProps {
  text: string;
  isActivated: boolean;
  onClick: () => void;
}
