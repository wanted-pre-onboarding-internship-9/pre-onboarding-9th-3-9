import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Chart from './components/Chart';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Chart />} />
      <Route path='/:id' element={<Chart />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
