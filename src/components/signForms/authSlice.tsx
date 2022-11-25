import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

const slice = createSlice({
  name: 'auth',
  initialState: { token: null } as {
    token: null | string;
  },
  reducers: {
    setToken: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      state.token = token;
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = slice.actions;
export default slice.reducer;
export const isUserLoggedIn = (state: RootState) => Boolean(state.auth.token);
