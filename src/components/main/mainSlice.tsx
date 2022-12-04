import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type MainState = {
  createBoardModalOpen: boolean;
  searchBoard: string;
};

const initialState: MainState = {
  createBoardModalOpen: false,
  searchBoard: '',
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
    setSearchBoard: (state, { payload }: PayloadAction<string>) => {
      state.searchBoard = payload;
    },
  },
});

export const { openCreateBoardModal, closeCreateBoardModal, setSearchBoard } = mainSlice.actions;

export const selectCreateBoardModalOpen = (state: RootState) => state.main.createBoardModalOpen;
export const searchBoard = (state: RootState) => state.main.searchBoard;

export default mainSlice.reducer;
