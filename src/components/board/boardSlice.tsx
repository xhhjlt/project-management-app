import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Column } from 'types/api/columns';
import { RootState } from '../../app/store';

export type DeleteColumnType = {
  isOpen: boolean;
  columnId: string | null;
};

export type ItemType = {
  id: string;
  title: string;
  description: string;
  priority: string;
  size: string;
  order: number;
  boardId: string;
  columnId: string;
};

export type DeleteItemPayloadOnDrag = {
  draggableId: string;
  srcColumnId: string;
};

export type AddItemPayloadOnDrop = {
  draggableItem: ItemType;
  destColumnId: string;
  destinationIndex: number;
};

export type AddColumnPayloadOnDrop = {
  draggableColumn: Column;
  destinationIndex: number;
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
  deleteColumnModalOpen: DeleteColumnType;
  itemModalOpen: CreateItemModalType;
  itemDescriptionModalOpen: ItemModalType;
  deleteItemModalOpen: ItemModalType;
};

const initialState: BoardState = {
  columnModalOpen: false,
  deleteColumnModalOpen: { isOpen: false, columnId: null },
  itemModalOpen: { isOpen: false, columnId: null },
  itemDescriptionModalOpen: { isOpen: false, itemId: null, columnId: null },
  deleteItemModalOpen: { isOpen: false, itemId: null, columnId: null },
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
    openDeleteColumnModal: (state, action: PayloadAction<Column>) => {
      state.deleteColumnModalOpen.isOpen = true;
      state.deleteColumnModalOpen.columnId = action.payload._id;
    },
    closeDeleteColumnModal: (state) => {
      state.deleteColumnModalOpen.isOpen = false;
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
    openDeleteItemModal: (state, action: PayloadAction<ItemModalPayloadType>) => {
      state.deleteItemModalOpen.isOpen = true;
      state.deleteItemModalOpen.itemId = action.payload.itemId;
      state.deleteItemModalOpen.columnId = action.payload.columnId;
    },
    closeDeleteItemModal: (state) => {
      state.deleteItemModalOpen.isOpen = false;
    },
  },
});

export const {
  openColumnModal,
  closeColumnModal,
  openDeleteColumnModal,
  closeDeleteColumnModal,
  openItemModal,
  closeItemModal,
  openItemDescriptionModal,
  closeItemDescriptionModal,
  openDeleteItemModal,
  closeDeleteItemModal,
} = boardSlice.actions;

export const selectColumnModalOpen = (state: RootState) => state.board.columnModalOpen;
export const selectDeleteColumnModalOpen = (state: RootState) => state.board.deleteColumnModalOpen;
export const selectItemModalOpen = (state: RootState) => state.board.itemModalOpen;
export const selectItemDescriptionModalOpen = (state: RootState) =>
  state.board.itemDescriptionModalOpen;
export const selectDeleteItemModalOpen = (state: RootState) => state.board.deleteItemModalOpen;

export default boardSlice.reducer;
