import { v4 as uuidv4 } from 'uuid';

export interface TaskInterface {
  id: string;
  title: string;
  description: string;
  order: number;
  userId?: string | null;
  boardId?: string | null;
  columnId?: string | null;
}

/**
 * @class Task which implements TaskInterface
 * @property id - The task's id
 * @property title - The task's title
 * @property description - The task's description
 * @property order - The task's order
 * @property userId - The user id to which the task is attached
 * @property boardId - The board id to which the task is attached
 * @property columnId - The column id to which the task is attached
 */
export class Task implements TaskInterface {
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
