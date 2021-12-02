let boards = [];

const findAll = () => boards;

const findById = (id) => boards.find((i) => i.id === id);

const addNewBoard = (board) => {
  boards.push(board);
};

const updateBoard = (id, data) => {
  const boardIndex = boards.findIndex((i) => i.id === id);
  if (boardIndex !== -1) {
    boards[boardIndex] = { ...boards[boardIndex], ...data };
    return boards[boardIndex];
  }
  return null;
};

const deleteBoard = (id) => {
  const board = findById(id);
  if (board) {
    boards = [...boards.filter((i) => i.id !== id)];
    return board;
  }
  return null;
};

module.exports = {
  findAll,
  findById,
  addNewBoard,
  updateBoard,
  deleteBoard,
};
