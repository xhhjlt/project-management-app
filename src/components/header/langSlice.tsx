import { createSlice } from '@reduxjs/toolkit';

const userLang = /^ru\b/.test(navigator.language) ? 'RU' : 'EN';

const langSlice = createSlice({
  name: 'lang',
  initialState: { current: userLang },
  reducers: {
    langToggle(state) {
      const newLang = state.current === 'RU' ? 'EN' : 'RU';
      state.current = newLang;
    },
  },
});

export const { langToggle } = langSlice.actions;
export default langSlice.reducer;
