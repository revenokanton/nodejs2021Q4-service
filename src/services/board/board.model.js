import { v4 as uuidv4 } from 'uuid';

class Board {
  constructor({ id = uuidv4(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => ({
      id: uuidv4(),
      ...column,
    }));
  }
}

export default Board;
