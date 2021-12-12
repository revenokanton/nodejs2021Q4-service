import { BoardInterface } from './board.model';

let boards: BoardInterface[] = [];

/**
 * Returns all boards from repository
 * @returns boards array from temporary db
 */
const findAll = (): BoardInterface[] => boards;

/**
 * Returns board from repository with provided id
 * @param id - id of the board
 * @returns board - with provided id
 * or undefined if no such board found
 */
const findById = (id: string): BoardInterface | undefined =>
  boards.find((i) => i.id === id);

/**
 * Add new board to the boards temporary db
 * @param board - object with board fields
 * @returns Nothing is returned.
 */
const addNewBoard = (board: BoardInterface): void => {
  boards.push(board);
};

/**
 * Updates board with provided id according to provided data
 * @param id - id of the board
 * @param data - object with parameters which should be updated in current board
 * @returns board with updated fields according to the transmitted id or null if no such board found
 */
const updateBoard = (
  id: string,
  data: BoardInterface
): BoardInterface | null => {
  const boardIndex = boards.findIndex((i) => i.id === id);
  if (boardIndex !== -1) {
    boards[boardIndex] = { ...boards[boardIndex], ...data };
    return boards[boardIndex];
  }
  return null;
};

/**
 * Delete board with provided id from temporary db
 * @param id - id of the board
 * @returns board which was deleted or null if no such board found
 */
const deleteBoard = (id: string): BoardInterface | null => {
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
