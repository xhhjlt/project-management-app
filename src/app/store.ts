import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import langReducer from '../components/header/langSlice';
import authReducer from '../components/signForms/authSlice';
import API from 'services/api';

export const store = configureStore({
  reducer: {
    lang: langReducer,
    auth: authReducer,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(API.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
