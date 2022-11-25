import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Board from 'routes/board';
import EditProfile from 'routes/editProfile';
import ErrorPage from 'routes/errorPage';
import Main from 'routes/main';
import Root from 'routes/root';
import SignIn from 'routes/signIn';
import Welcome from 'routes/welcome';
import SignUp from 'routes/signUp';
import { AppRoutes } from 'types/routes';
import { PrivateWrapper } from './privateWrapper';
import { PublicWrapper } from './publicWrapper';

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: AppRoutes.Welcome,
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Welcome />,
        },
        {
          element: <PublicWrapper />,
          children: [
            {
              path: AppRoutes.SignIn,
              element: <SignIn />,
            },
            {
              path: AppRoutes.SignUp,
              element: <SignUp />,
            },
          ],
        },
        {
          element: <PrivateWrapper />,
          children: [
            {
              path: AppRoutes.EditProfile,
              element: <EditProfile />,
            },
            {
              path: AppRoutes.Main,
              element: <Main />,
            },
            {
              path: AppRoutes.Board,
              element: <Board />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
