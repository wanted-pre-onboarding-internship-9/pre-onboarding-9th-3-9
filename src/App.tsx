import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import styled from 'styled-components';

import Chart from './components/Chart';

function App() {
  return (
    <StApp>
      <h1>Flexsys</h1>
      <RouterProvider router={router} />
    </StApp>
  );
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navigate to='/전체' />} />
      <Route path='/:id' element={<Chart />} />
    </>
  )
);

export default App;

const StApp = styled.div`
  text-align: center;
`;
