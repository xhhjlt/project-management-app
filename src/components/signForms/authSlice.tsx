import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import jwtDecode, { JwtPayload } from 'jwt-decode';

const initialState = { token: '', userId: '', userLogin: '' } as {
  token: string;
  userId: string;
  userLogin: string;
};

interface AppJwtPayload extends JwtPayload {
  id: string;
  login: string;
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      state.token = token;
      const decoded = jwtDecode<AppJwtPayload>(token);
      state.userId = decoded.id;
      state.userLogin = decoded.login;
    },
    clearUser: (state) => {
      state.token = initialState.token;
      state.userId = initialState.userId;
      state.userLogin = initialState.userLogin;
    },
  },
});

export const { setUser, clearUser } = slice.actions;
export default slice.reducer;
export const isUserLoggedIn = (state: RootState) => Boolean(state.auth.userId);
export const CurrentUserId = (state: RootState) => state.auth.userId;
export const CurrentUserLogin = (state: RootState) => state.auth.userLogin;
