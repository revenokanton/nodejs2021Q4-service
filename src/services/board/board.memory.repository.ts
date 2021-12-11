import { BoardInterface } from './board.model';

let boards: BoardInterface[] = [];

const findAll = () => boards;

const findById = (id: string) => boards.find((i) => i.id === id);

const addNewBoard = (board: BoardInterface) => {
  boards.push(board);
};

const updateBoard = (id: string, data: BoardInterface) => {
  const boardIndex = boards.findIndex((i) => i.id === id);
  if (boardIndex !== -1) {
    boards[boardIndex] = { ...boards[boardIndex], ...data };
    return boards[boardIndex];
  }
  return null;
};

const deleteBoard = (id: string) => {
  const board = findById(id);
  if (board) {
    boards = [...boards.filter((i) => i.id !== id)];
    return board;
  }
  return null;
};

export default {
  findAll,
  findById,
  addNewBoard,
  updateBoard,
  deleteBoard,
};
