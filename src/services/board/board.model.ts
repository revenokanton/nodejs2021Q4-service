import { v4 as uuidv4 } from 'uuid';

export interface ColumnInterface {
  title: string;
  order: number;
}

export interface BoardInterface {
  id: string;
  title: string;
  columns: ColumnInterface[];
}

/**
 * @class Board which implements BoardInterface
 * @property id - The board's id
 * @property title - The board's title
 * @property columns - The board's columns
 */
export class Board implements BoardInterface {
  id: string;

  title: string;

  columns: ColumnInterface[];

  constructor({
    id = uuidv4(),
    title = 'BOARD',
    columns = [],
  }: BoardInterface) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => ({
      id: uuidv4(),
      ...column,
    }));
  }
}
