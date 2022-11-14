import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Board from 'routes/board';
import ErrorPage from 'routes/errorPage';
import Main from 'routes/main';
import Root from 'routes/root';
import Sign from 'routes/sign';
import Welcome from 'routes/welcome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: 'sign',
        element: <Sign />,
      },
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: 'board',
        element: <Board />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
