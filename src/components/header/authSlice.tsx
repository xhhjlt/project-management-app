import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: '' },
  reducers: {
    logIn(state) {
      state.user = 'Вася';
    },
    logOut(state) {
      state.user = '';
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
