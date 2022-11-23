import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import Board from 'routes/board';
import EditProfile from 'routes/editProfile';
import ErrorPage from 'routes/errorPage';
import Main from 'routes/main';
import Root from 'routes/root';
import SignIn from 'routes/signIn';
import Welcome from 'routes/welcome';
import SignUp from 'routes/signUp';
import { AppRoutes } from 'types/routes';
import { useAppSelector } from 'app/hooks';
import { isUserLoggedIn } from 'components/signForms/authSlice';

export default function AppRouter() {
  const isLoggedIn = useAppSelector(isUserLoggedIn);

  const PrivateWrapper = () => {
    return isLoggedIn ? <Outlet /> : <Navigate to={AppRoutes.Welcome} replace />;
  };

  const PublicWrapper = () => {
    return isLoggedIn ? <Navigate to={AppRoutes.Main} replace /> : <Outlet />;
  };

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
