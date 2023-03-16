import { RouterProvider } from 'react-router-dom';

import router from './shared/Router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
