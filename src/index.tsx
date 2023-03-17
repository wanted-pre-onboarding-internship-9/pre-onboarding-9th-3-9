import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Home from './page/Home';
import NotFound from './page/NotFound';
import QueryParmRoute from './page/QueryParmRoute';
import GlobalStyle from './styles/GlobalStyle';
import './styles/index.css';
import { theme } from './styles/theme';

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
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <RouterProvider router={router} />
  </ThemeProvider>
);
