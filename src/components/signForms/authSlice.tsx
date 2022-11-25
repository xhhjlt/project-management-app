import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import jwtDecode, { JwtPayload } from 'jwt-decode';

interface authState {
  token: string | null;
  id: string | null;
  login: string | null;
}
interface AppJwtPayload extends JwtPayload {
  id: string;
  login: string;
}

const token = localStorage.getItem('token');
const decoded = token ? jwtDecode<AppJwtPayload>(token) : { id: null, login: null };
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
    clearUser: (state) => {
      state.token = null;
      state.id = null;
      state.login = null;
    },
  },
});

export const { setUser, clearUser } = slice.actions;
export default slice.reducer;
export const isUserLoggedIn = (state: RootState) => Boolean(state.auth.id);
export const CurrentUserId = (state: RootState) => state.auth.id;
export const CurrentUserLogin = (state: RootState) => state.auth.login;
