import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { clearUser, setUser } from 'components/signForms/authSlice';
import { showErrorToast } from 'components/common/commonSlice';

export const apiErrorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    api.dispatch(showErrorToast(action.payload.data.message));
    switch (action.payload.status) {
      case 403:
        api.dispatch(clearUser());
        break;
      default:
        break;
    }
  }
  return next(action);
};

export const authStorage: Middleware = () => (next) => (action) => {
  switch (action.type) {
    case setUser.type:
      localStorage.setItem('token', action.payload.token);
      break;
    case clearUser.type:
      localStorage.removeItem('token');
      break;
    default:
      break;
  }

  return next(action);
};
