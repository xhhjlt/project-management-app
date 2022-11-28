import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type MainState = {
  deleteConfirmationModalId: string | null;
};

const initialState: MainState = {
  deleteConfirmationModalId: null,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    openDeleteConfirmationModal: (state, action: PayloadAction<string>) => {
      state.deleteConfirmationModalId = action.payload;
      // state.deleteConfirmationModalOpen = true;
    },
    closeDeleteConfirmationModal: (state) => {
      // state.deleteConfirmationModalOpen = false;
      state.deleteConfirmationModalId = null;
    },
  },
});

export const { openDeleteConfirmationModal, closeDeleteConfirmationModal } = commonSlice.actions;

export const selectDeleteConfirmationModalOpen = (state: RootState) =>
  state.common.deleteConfirmationModalId;

export default commonSlice.reducer;
