import { v4 as uuidv4 } from 'uuid';
import { TaskInterface } from './task.model.d';

class Task implements TaskInterface {
  id: string;

  title: string;

  description: string;

  order: number;

  userId?: string | null;

  boardId?: string | null;

  columnId?: string | null;

  constructor({
    id = uuidv4(),
    title = 'TASK',
    description = 'description',
    order = 0,
    userId,
    boardId,
    columnId,
  }: TaskInterface) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.order = order;
    this.userId = userId || null;
    this.boardId = boardId || null;
    this.columnId = columnId || null;
  }
}

export default Task;
