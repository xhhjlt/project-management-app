import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import jwtDecode, { JwtPayload } from 'jwt-decode';

interface authState {
  token: string;
  id: string;
  login: string;
}
interface AppJwtPayload extends JwtPayload {
  id: string;
  login: string;
}

const token = localStorage.getItem('token') || '';
const decoded = token ? jwtDecode<AppJwtPayload>(token) : { id: '', login: '' };
const initialState: authState = { token, ...decoded };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      state.token = token;
      const decoded = jwtDecode<AppJwtPayload>(token);
      state.id = decoded.id;
      state.login = decoded.login;
    },
    changeLogin: (state, { payload: { login } }: PayloadAction<{ login: string }>) => {
      state.login = login;
    },
    clearUser: (state) => {
      state.token = '';
      state.id = '';
      state.login = '';
    },
  },
});

export const { setUser, clearUser, changeLogin } = slice.actions;
export default slice.reducer;
export const isUserLoggedIn = (state: RootState) => Boolean(state.auth.id);
export const CurrentUserId = (state: RootState) => state.auth.id;
export const CurrentUserLogin = (state: RootState) => state.auth.login;
