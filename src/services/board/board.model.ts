import { v4 as uuidv4 } from 'uuid';

import { BoardInterface, ColumnInterface } from './board.model.d';

class Board implements BoardInterface {
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
    this.columns = columns.map((column: ColumnInterface) => ({
      id: uuidv4(),
      ...column,
    }));
  }
}

export default Board;
