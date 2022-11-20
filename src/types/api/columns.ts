export interface Column {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface ColumnId {
  boardID: string;
  columnID: string;
}
