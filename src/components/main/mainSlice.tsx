import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type MainState = {
  createBoardModalOpen: boolean;
};

const initialState: MainState = {
  createBoardModalOpen: false,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    openCreateBoardModal: (state) => {
      state.createBoardModalOpen = true;
    },
    closeCreateBoardModal: (state) => {
      state.createBoardModalOpen = false;
    },
  },
});

export const { openCreateBoardModal, closeCreateBoardModal } = mainSlice.actions;

export const selectCreateBoardModalOpen = (state: RootState) => state.main.createBoardModalOpen;

export default mainSlice.reducer;
