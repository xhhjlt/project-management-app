import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { clearUser, setUser } from 'components/signForms/authSlice';

export const invalidTokenErrorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 403) {
      api.dispatch(clearUser());
    }
  }
  return next(action);
};

export const saveTokenInStorage: Middleware = () => (next) => (action) => {
  if (action.type === setUser.type) {
    const token = action.payload.token;
    localStorage.setItem('token', token);
  }

  return next(action);
};

export const clearTokenInStorage: Middleware = () => (next) => (action) => {
  if (action.type === clearUser.type) {
    localStorage.removeItem('token');
  }

  return next(action);
};
