import { BoardInterface } from './board.model';

let boards: BoardInterface[] = [];

/**
 * Returns all boards from repository
 * @returns Promise - to boards array from temporary db
 */
const findAll = async (): Promise<BoardInterface[]> => boards;

/**
 * Returns board from repository with provided id
 * @param id - id of the board
 * @returns Promise to board with provided id
 * or undefined if no such board found
 */
const findById = async (id: string): Promise<BoardInterface | undefined> =>
  boards.find((i) => i.id === id);

/**
 * Add new board to the boards temporary db
 * @param board - object with board fields
 * @returns Promise void is returned
 */
const addNewBoard = async (board: BoardInterface): Promise<void> => {
  boards.push(board);
};

/**
 * Updates board with provided id according to provided data
 * @param id - id of the board
 * @param data - object with parameters which should be updated in current board
 * @returns Promise to board with updated fields according to the transmitted id or null if no such board found
 */
const updateBoard = async (
  id: string,
  data: BoardInterface
): Promise<BoardInterface | null> => {
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
 * @returns Promise to board which was deleted or null if no such board found
 */
const deleteBoard = async (id: string): Promise<BoardInterface | null> => {
  const board = await findById(id);
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
