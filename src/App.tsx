import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

// import instance from './apis/instance';
// import { DataAPI } from './apis/instance';
// import { ResponseDataType } from './common/Types';
import Chart from './components/Chart';
import Filter from './components/Filter';
import { ContextAPI } from './hooks/ContextAPI';
import useResponse from './hooks/useResponse';

function App() {
  const [chartData] = useResponse();
  const [selectedId, setSelectedId] = useState<string>('전체');

  const handleButton = (target: string) => {
    setSelectedId(target);
  };

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
