import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import langReducer from '../components/header/langSlice';
import authReducer from '../components/signForms/authSlice';
import API from 'services/api';
import { invalidTokenErrorHandler } from 'app/middleware';

export const store = configureStore({
  reducer: {
    lang: langReducer,
    auth: authReducer,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware).concat(invalidTokenErrorHandler),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
