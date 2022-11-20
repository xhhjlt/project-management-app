export default interface Task {
  _id: string;
  title: string;
  order: 0;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: Array<string>;
}
