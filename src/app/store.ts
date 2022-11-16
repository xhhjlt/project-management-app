import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import langReducer from '../components/header/langSlice';
import authReducer from '../components/header/authSlice';

export const store = configureStore({
  reducer: {
    lang: langReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
