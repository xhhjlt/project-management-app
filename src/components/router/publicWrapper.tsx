import { useAppSelector } from 'app/hooks';
import { isUserLoggedIn } from 'components/signForms/authSlice';
import { Navigate, Outlet } from 'react-router-dom';
import { AppRoutes } from 'types/routes';

export const PublicWrapper = () => {
  const isLoggedIn = useAppSelector(isUserLoggedIn);
  return isLoggedIn ? <Navigate to={AppRoutes.Main} replace /> : <Outlet />;
};
