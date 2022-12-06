import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Column } from 'types/api/columns';
import { RootState } from '../../app/store';

export type DeleteColumnType = {
  isOpen: boolean;
  columnId: string | null;
};

export type CreateItemModalType = {
  isOpen: boolean;
  columnId: string | null;
};

export type ItemModalType = {
  isOpen: boolean;
  itemId: string | null;
  columnId: string | null;
};

export type ItemModalPayloadType = {
  itemId: string;
  columnId: string;
};

export type BoardState = {
  columnModalOpen: boolean;
  itemModalOpen: CreateItemModalType;
  itemDescriptionModalOpen: ItemModalType;
  taskSearchValue: string;
};

const initialState: BoardState = {
  columnModalOpen: false,
  itemModalOpen: { isOpen: false, columnId: null },
  itemDescriptionModalOpen: { isOpen: false, itemId: null, columnId: null },
  taskSearchValue: '',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    openColumnModal: (state) => {
      state.columnModalOpen = true;
    },
    closeColumnModal: (state) => {
      state.columnModalOpen = false;
    },
    openItemModal: (state, action: PayloadAction<Column>) => {
      state.itemModalOpen.isOpen = true;
      state.itemModalOpen.columnId = action.payload._id;
    },
    closeItemModal: (state) => {
      state.itemModalOpen.isOpen = false;
    },
    openItemDescriptionModal: (state, action: PayloadAction<ItemModalPayloadType>) => {
      state.itemDescriptionModalOpen.isOpen = true;
      state.itemDescriptionModalOpen.itemId = action.payload.itemId;
      state.itemDescriptionModalOpen.columnId = action.payload.columnId;
    },
    closeItemDescriptionModal: (state) => {
      state.itemDescriptionModalOpen.isOpen = false;
    },
    setTaskSearchValue: (state, action: PayloadAction<string>) => {
      state.taskSearchValue = action.payload;
    },
  },
});

export const {
  openColumnModal,
  closeColumnModal,
  openItemModal,
  closeItemModal,
  openItemDescriptionModal,
  closeItemDescriptionModal,
  setTaskSearchValue,
} = boardSlice.actions;

export const selectColumnModalOpen = (state: RootState) => state.board.columnModalOpen;
export const selectItemModalOpen = (state: RootState) => state.board.itemModalOpen;
export const selectItemDescriptionModalOpen = (state: RootState) =>
  state.board.itemDescriptionModalOpen;
export const selectTaskSearchValue = (state: RootState) => state.board.taskSearchValue;

export default boardSlice.reducer;
