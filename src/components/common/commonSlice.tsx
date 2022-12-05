import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type DeleteConfirmationModalParams = {
  text: {
    titleEn: string;
    titleRus: string;
    bodyEn: string;
    bodyRus: string;
  };
  onDelete: () => void;
};

export type MainState = {
  deleteConfirmationModalParams: DeleteConfirmationModalParams | null;
  errorToastMessage: string;
  errorToastFlag: boolean;
};

const initialState: MainState = {
  deleteConfirmationModalParams: null,
  errorToastMessage: '',
  errorToastFlag: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    openDeleteConfirmationModal: (state, action: PayloadAction<DeleteConfirmationModalParams>) => {
      state.deleteConfirmationModalParams = action.payload;
    },
    closeDeleteConfirmationModal: (state) => {
      state.deleteConfirmationModalParams = null;
    },
    showErrorToast: (state, action: PayloadAction<string>) => {
      state.errorToastMessage = action.payload;
      state.errorToastFlag = !state.errorToastFlag;
    },
  },
});

export const { openDeleteConfirmationModal, closeDeleteConfirmationModal, showErrorToast } =
  commonSlice.actions;

export const selectDeleteConfirmationModalParams = (state: RootState) =>
  state.common.deleteConfirmationModalParams;
export const errorToastMessage = (state: RootState) => state.common.errorToastMessage;
export const errorToastFlag = (state: RootState) => state.common.errorToastFlag;

export default commonSlice.reducer;
