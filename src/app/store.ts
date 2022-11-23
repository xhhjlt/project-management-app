import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import langReducer from '../components/header/langSlice';
import authReducer from '../components/signForms/authSlice';
import API from 'services/api';
import { clearTokenInStorage, invalidTokenErrorHandler, saveTokenInStorage } from 'app/middleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lang: langReducer,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      API.middleware,
      invalidTokenErrorHandler,
      saveTokenInStorage,
      clearTokenInStorage
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
