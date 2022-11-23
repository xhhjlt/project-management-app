import { useAppSelector } from 'app/hooks';
import { isUserLoggedIn } from 'components/signForms/authSlice';
import { Outlet, Navigate } from 'react-router-dom';
import { AppRoutes } from 'types/routes';

export const PrivateWrapper = () => {
  const isLoggedIn = useAppSelector(isUserLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to={AppRoutes.Welcome} replace />;
};
