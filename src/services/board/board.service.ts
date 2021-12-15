import { FastifyReply, FastifyRequest } from 'fastify';
import { Board, BoardInterface } from './board.model';
import boardRepo from './board.memory.repository';
import taskRepo from '../task/task.memory.repository';
import { handleNotFound } from '../errors/errors.service';

export type BoardRequestType = {
  Params: { id: string };
  Body: BoardInterface;
};

/**
 * Send all boards from database
 * @param _ - fastify request
 * @param reply fastify reply
 * @returns Promise void is returned
 */
export const getAllBoards = async (
  _: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const boards = await boardRepo.findAll();
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(boards);
};

/**
 * Send board regarding provided id
 * @param req - fastify request with board request parameters
 * @param reply fastify reply
 * @returns Promise void is returned
 */
export const getBoard = async (
  req: FastifyRequest<BoardRequestType>,
  reply: FastifyReply
): Promise<void> => {
  const id = req?.params?.id;
  const board = await boardRepo.findById(id);
  if (board) {
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(board);
  } else {
    await handleNotFound(reply, 'board');
  }
};

/**
 * Add board to database and send added board data
 * @param req - fastify request with board request parameters
 * @param reply fastify reply
 * @returns Promise void is returned
 */
export const addBoard = async (
  req: FastifyRequest<BoardRequestType>,
  reply: FastifyReply
): Promise<void> => {
  const board = new Board(req.body);
  await boardRepo.addNewBoard(board);
  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(board);
};

/**
 * Update board with parameters regarding provided id to database
 * and send updated board data
 * @param req - fastify request with board request parameters
 * @param reply fastify reply
 * @returns Promise void is returned
 */
export const updateBoard = async (
  req: FastifyRequest<BoardRequestType>,
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  const { ...updateData } = req.body;
  const board = await boardRepo.updateBoard(id, updateData);
  if (board) {
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(board);
  } else {
    await handleNotFound(reply, 'board');
  }
};

/**
 * Delete board regarding provided id from database
 * and send deleted board data
 * @param req - fastify request with board request parameters
 * @param reply fastify reply
 * @returns Promise void is returned
 */
export const deleteBoard = async (
  req: FastifyRequest<BoardRequestType>,
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  const board = await boardRepo.deleteBoard(id);
  if (board) {
    await taskRepo.deleteTasksByBoardId(id);
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(board);
  } else {
    await handleNotFound(reply, 'board');
  }
};
