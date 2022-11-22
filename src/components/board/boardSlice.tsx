import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export type DeleteColumnType = {
  isOpen: boolean;
  columnId: string | null;
};

export type ChipType = {
  value: string;
  icon: string;
};

export type ItemType = {
  id: string;
  title: string;
  description?: string;
  priority: ChipType;
  size: ChipType;
};

export type ItemPayloadType = {
  title: string;
  description?: string;
  priority: ChipType;
  size: ChipType;
};

export type ColumnType = {
  id: string;
  title?: string;
  items?: Array<ItemType>;
};

export type ItemModalType = {
  isOpen: boolean;
  columnId: string | null;
};

export type ItemDescriptionModalType = {
  isOpen: boolean;
  itemId: string | null;
  itemTitle: string | null;
  itemDescription?: string | null;
  itemPriority?: ChipType;
  itemSize?: ChipType;
};

export type DeleteItemType = {
  isOpen: boolean;
  itemId: string | null;
};

export type BoardState = {
  columnModalOpen: boolean;
  boardColumns: Array<ColumnType>;
  deleteColumnModalOpen: DeleteColumnType;
  itemModalOpen: ItemModalType;
  itemDescriptionModalOpen: ItemDescriptionModalType;
  deleteItemModalOpen: DeleteItemType;
  // status: 'idle' | 'loading' | 'failed';
};

const initialState: BoardState = {
  columnModalOpen: false,
  boardColumns: [],
  deleteColumnModalOpen: { isOpen: false, columnId: null },
  itemModalOpen: { isOpen: false, columnId: null },
  itemDescriptionModalOpen: { isOpen: false, itemId: null, itemTitle: null, itemDescription: null },
  deleteItemModalOpen: { isOpen: false, itemId: null },
  // status: 'idle',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    openColumnModal: (state) => {
      state.columnModalOpen = true;
    },
    closeColumnModal: (state) => {
      state.columnModalOpen = false;
    },
    addBoardColumn: (state, action: PayloadAction<ColumnType>) => {
      state.boardColumns.push(action.payload);
    },
    deleteBoardColumn: (state) => {
      state.boardColumns = state.boardColumns.filter(
        (el) => el.id !== state.deleteColumnModalOpen.columnId
      );
    },
    openDeleteColumnModal: (state, action: PayloadAction<ColumnType>) => {
      state.deleteColumnModalOpen.isOpen = true;
      state.deleteColumnModalOpen.columnId = action.payload.id;
    },
    closeDeleteColumnModal: (state) => {
      state.deleteColumnModalOpen.isOpen = false;
    },
    openItemModal: (state, action: PayloadAction<ColumnType>) => {
      state.itemModalOpen.isOpen = true;
      state.itemModalOpen.columnId = action.payload.id;
    },
    closeItemModal: (state) => {
      state.itemModalOpen.isOpen = false;
    },
    addNewItem: (state, action: PayloadAction<ItemType>) => {
      const column = state.boardColumns.find((el) => el.id === state.itemModalOpen.columnId);
      if (column) {
        if (!column.items) {
          column.items = [];
        }
        column.items!.push(action.payload);
      }
    },
    openItemDescriptionModal: (state, action: PayloadAction<ItemType>) => {
      state.itemDescriptionModalOpen.isOpen = true;
      state.itemDescriptionModalOpen.itemId = action.payload.id;
      state.itemDescriptionModalOpen.itemTitle = action.payload.title;
      state.itemDescriptionModalOpen.itemDescription = action.payload.description;
      state.itemDescriptionModalOpen.itemPriority = action.payload.priority;
      state.itemDescriptionModalOpen.itemSize = action.payload.size;
    },
    closeItemDescriptionModal: (state) => {
      state.itemDescriptionModalOpen.isOpen = false;
    },
    setItem: (state, action: PayloadAction<ItemPayloadType>) => {
      const itemId = state.itemDescriptionModalOpen.itemId;
      const item = state.boardColumns
        .map((col) => col.items)
        .flat()
        .find((item) => item?.id === itemId);

      if (item) {
        item.title = action.payload.title;
        item.description = action.payload.description;
        item.priority.value = action.payload.priority.value;
        item.priority.icon = action.payload.priority.icon;
        item.size.value = action.payload.size.value;
        item.size.icon = action.payload.size.icon;
      }
    },
    // setItemPriority: (state, action: PayloadAction<ChipType>) => {
    //   const itemId = state.itemDescriptionModalOpen.itemId;
    //   const item = state.boardColumns
    //     .map((col) => col.items)
    //     .flat()
    //     .find((item) => item?.id === itemId);

    //   if (item) {
    //     item.priority.value = action.payload.value;
    //     item.priority.icon = action.payload.icon;
    //   }
    // },
    // setItemSize: (state, action: PayloadAction<ChipType>) => {
    //   const itemId = state.itemDescriptionModalOpen.itemId;
    //   const item = state.boardColumns
    //     .map((col) => col.items)
    //     .flat()
    //     .find((item) => item?.id === itemId);

    //   if (item) {
    //     item.size.value = action.payload.value;
    //     item.size.icon = action.payload.icon;
    //   }
    // },
    openDeleteItemModal: (state, action: PayloadAction<string>) => {
      state.deleteItemModalOpen.isOpen = true;
      state.deleteItemModalOpen.itemId = action.payload;
    },
    closeDeleteItemModal: (state) => {
      state.deleteItemModalOpen.isOpen = false;
    },
    deleteBoardItem: (state) => {
      const itemId = state.deleteItemModalOpen.itemId;

      // https://stackoverflow.com/questions/38375646/filtering-array-of-objects-with-arrays-based-on-nested-value
      state.boardColumns = state.boardColumns.map((element) => {
        return { ...element, items: element.items?.filter((item) => item?.id !== itemId) };
      });
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     })
  //     .addCase(incrementAsync.rejected, (state) => {
  //       state.status = 'failed';
  //     });
  // },
});

export const {
  openColumnModal,
  closeColumnModal,
  addBoardColumn,
  deleteBoardColumn,
  openDeleteColumnModal,
  closeDeleteColumnModal,
  openItemModal,
  closeItemModal,
  addNewItem,
  openItemDescriptionModal,
  closeItemDescriptionModal,
  setItem,
  openDeleteItemModal,
  closeDeleteItemModal,
  deleteBoardItem,
} = boardSlice.actions;

export const selectColumnModalOpen = (state: RootState) => state.board.columnModalOpen;
export const selectBoardColumns = (state: RootState) => state.board.boardColumns;
export const selectDeleteColumnModalOpen = (state: RootState) => state.board.deleteColumnModalOpen;
export const selectItemModalOpen = (state: RootState) => state.board.itemModalOpen;
export const selectItemDescriptionModalOpen = (state: RootState) =>
  state.board.itemDescriptionModalOpen;
export const selectDeleteItemModalOpen = (state: RootState) => state.board.deleteItemModalOpen;

export default boardSlice.reducer;
