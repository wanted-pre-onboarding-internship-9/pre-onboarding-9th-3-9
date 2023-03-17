import { useState } from 'react';

import instance from '../apis/instance';
import { ResponseDataType } from '../common/Types';

function useResponse() {
  const [chartData, setChartData] = useState<ResponseDataType[]>();
  const getInstance = async () => {
    const data = await instance.get('');
    const response: ResponseDataType[] = Object.values(data.data.response);
    setChartData([...response]);
  };
  getInstance();
  return [chartData];
}
export default useResponse;
