const { v4: uuidv4 } = require('uuid');

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

module.exports = Board;
