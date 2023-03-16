import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import ChartPage from '../pages/ChartPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navigate to='/전체' />} />
      <Route path='/:id' element={<ChartPage />} />
    </>
  )
);
export default router;
