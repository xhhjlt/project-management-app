import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type OpenBoardModalPayload = {
  id: string;
  type: 'create' | 'edit' | 'duplicate';
};

export type MainState = {
  boardModalId: string | null;
  boardModalType: 'create' | 'edit' | 'duplicate';
  searchBoard: string;
};

const initialState: MainState = {
  boardModalId: null,
  boardModalType: 'create',
  searchBoard: '',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    openBoardModal: (state, { payload }: PayloadAction<OpenBoardModalPayload | undefined>) => {
      state.boardModalType = payload?.type || 'create';
      state.boardModalId = payload?.id || '';
    },
    closeBoardModal: (state) => {
      state.boardModalId = null;
    },
    setSearchBoard: (state, { payload }: PayloadAction<string>) => {
      state.searchBoard = payload;
    },
  },
});

export const { openBoardModal, closeBoardModal, setSearchBoard } = mainSlice.actions;

export const selectBoardModalOpen = (state: RootState) => state.main.boardModalId;
export const selectBoardModalType = (state: RootState) => state.main.boardModalType;
export const searchBoard = (state: RootState) => state.main.searchBoard;

export default mainSlice.reducer;
