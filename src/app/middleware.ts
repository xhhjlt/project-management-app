import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { clearUser } from 'components/signForms/authSlice';

export const invalidTokenErrorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 403) {
      api.dispatch(clearUser());
    }
  }
  return next(action);
};
