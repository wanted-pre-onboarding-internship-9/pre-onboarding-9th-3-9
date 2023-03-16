import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import Home from './page/Home';
import NotFound from './page/NotFound';
import QueryParmRoute from './page/QueryParmRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: '/',
        element: (
          <QueryParmRoute require='id'>
            <Home />
          </QueryParmRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router} />);
