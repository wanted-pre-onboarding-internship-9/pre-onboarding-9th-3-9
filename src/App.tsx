import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import instance from './apis/instance';
import { ResponseDataType } from './common/Types';
import Chart from './components/Chart';
import Filter from './components/Filter';
import { ContextAPI } from './hooks/ContextAPI';

function App() {
  const [chartData, setChartData] = useState<ResponseDataType[]>();
  const getInstance = async () => {
    const data = await instance.get('');
    const response: ResponseDataType[] = Object.values(data.data.response);
    setChartData([...response]);
  };
  const [selectedId, setSelectedId] = useState<string>('');
  const handleButton = (target: string) => {
    console.log(selectedId);
    setSelectedId(target);
  };

  useEffect(() => {
    getInstance();
  }, []);

  if (chartData) {
    return (
      <div>
        <ContextAPI.Provider value={chartData}>
          <ChakraProvider>
            <Filter onClick={handleButton} />
          </ChakraProvider>
          <Chart selectedId={selectedId} />
        </ContextAPI.Provider>
      </div>
    );
  }
  return <div />;
}
export default App;
