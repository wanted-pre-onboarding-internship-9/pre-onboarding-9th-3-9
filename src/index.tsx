import ReactDOM from 'react-dom/client';
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Home from './page/Home';
import NotFound from './page/NotFound';
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
        element: <Home />,
      },
      {
        path: '*',
        element: <Navigate replace to='/' />,
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
