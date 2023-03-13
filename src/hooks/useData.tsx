import { useCallback, useEffect, useState } from 'react';

import instance from '../apis/instance';
import { IData } from '../types';

const useData = () => {
  const [data, setData] = useState<IData>();
  const [isLoading, setIsLoading] = useState(true);

  const getData = useCallback(() => instance.get(''), []);

  useEffect(() => {
    getData()
      .then(({ data: { response } }) => setData(response))
      .finally(() => setIsLoading(props => !props));
  }, []);

  return { data, isLoading };
};

export default useData;
