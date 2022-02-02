import { getManager, getRepository } from 'typeorm';
import { Board, BoardInterface } from './board.model';

/**
 * Returns all boards from repository
 * @returns Promise - to boards array from temporary db
 */
const findAll = async (): Promise<BoardInterface[]> => getManager().find(Board);

/**
 * Returns board from repository with provided id
 * @param id - id of the board
 * @returns Promise to board with provided id
 * or undefined if no such board found
 */
const findById = async (id: string): Promise<BoardInterface | undefined> =>
  getRepository(Board).findOne(id);

/**
 * Add new board to the boards temporary db
 * @param board - object with board fields
 * @returns Promise void is returned
 */
const addNewBoard = async (board: BoardInterface): Promise<Board> =>
  getRepository(Board).save(board);

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
  const existingBoard = await getRepository(Board).findOne(id);
  if (existingBoard) {
    const boardToUpdate = { ...existingBoard, ...data };
    return getRepository(Board).save(boardToUpdate);
  }
  return null;
};

/**
 * Delete board with provided id from temporary db
 * @param id - id of the board
 * @returns Promise to board which was deleted or null if no such board found
 */
const deleteBoard = async (id: string): Promise<BoardInterface | null> => {
  const boardToDelete = await getRepository(Board).findOne(id);
  if (boardToDelete) {
    return getRepository(Board).remove(boardToDelete);
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
