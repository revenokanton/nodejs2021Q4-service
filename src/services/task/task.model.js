const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    id = uuidv4(),
    title = 'TASK',
    description = 'description',
    order = 0,
    userId,
    boardId,
    columnId,
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.order = order;
    this.userId = userId || null;
    this.boardId = boardId || null;
    this.columnId = columnId || null;
  }
}

module.exports = Task;
