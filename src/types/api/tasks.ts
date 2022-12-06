export default interface Task {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  size: string;
  priority: string;
  userId: string;
  users: Array<string>;
}
