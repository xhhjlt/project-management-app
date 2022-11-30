import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type MainState = {
  deleteConfirmationModalId: string | null;
  errorToastMessage: string;
  errorToastFlag: boolean;
};

const initialState: MainState = {
  deleteConfirmationModalId: null,
  errorToastMessage: '',
  errorToastFlag: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    openDeleteConfirmationModal: (state, action: PayloadAction<string>) => {
      state.deleteConfirmationModalId = action.payload;
    },
    closeDeleteConfirmationModal: (state) => {
      state.deleteConfirmationModalId = null;
    },
    showErrorToast: (state, action: PayloadAction<string>) => {
      state.errorToastMessage = action.payload;
      state.errorToastFlag = !state.errorToastFlag;
    },
  },
});

export const { openDeleteConfirmationModal, closeDeleteConfirmationModal, showErrorToast } =
  commonSlice.actions;

export const selectDeleteConfirmationModalOpen = (state: RootState) =>
  state.common.deleteConfirmationModalId;
export const errorToastMessage = (state: RootState) => state.common.errorToastMessage;
export const errorToastFlag = (state: RootState) => state.common.errorToastFlag;

export default commonSlice.reducer;
