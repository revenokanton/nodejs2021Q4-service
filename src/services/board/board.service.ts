import boom from 'boom';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Board, BoardInterface } from './board.model';
import boardRepo from './board.memory.repository';
import taskRepo from '../task/task.memory.repository';
import { handleNotFound } from '../errors/errors.service';

export type BoardRequestType = {
  Params: { id: string };
  Body: BoardInterface;
};

export const getAllBoards = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const boards = await boardRepo.findAll();
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(boards);
  } catch (err) {
    if (err instanceof Error) {
      throw boom.boomify(err);
    } else {
      throw err;
    }
  }
};

export const getBoard = async (
  req: FastifyRequest<BoardRequestType>,
  reply: FastifyReply
) => {
  try {
    const id = req?.params?.id;
    const board = await boardRepo.findById(id);
    if (board) {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(board);
    } else {
      handleNotFound(reply, 'board');
    }
  } catch (err) {
    if (err instanceof Error) {
      throw boom.boomify(err);
    } else {
      throw err;
    }
  }
};

export const addBoard = async (
  req: FastifyRequest<BoardRequestType>,
  reply: FastifyReply
) => {
  try {
    const board = new Board(req.body);
    await boardRepo.addNewBoard(board);
    reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(board);
  } catch (err) {
    if (err instanceof Error) {
      throw boom.boomify(err);
    } else {
      throw err;
    }
  }
};

export const updateBoard = async (
  req: FastifyRequest<BoardRequestType>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const { ...updateData } = req.body;
    const board = await boardRepo.updateBoard(id, updateData);
    if (board) {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(board);
    } else {
      handleNotFound(reply, 'board');
    }
  } catch (err) {
    if (err instanceof Error) {
      throw boom.boomify(err);
    } else {
      throw err;
    }
  }
};

export const deleteBoard = async (
  req: FastifyRequest<BoardRequestType>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const board = await boardRepo.deleteBoard(id);
    if (board) {
      await taskRepo.deleteTasksByBoardId(id);
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(board);
    } else {
      handleNotFound(reply, 'board');
    }
  } catch (err) {
    if (err instanceof Error) {
      throw boom.boomify(err);
    } else {
      throw err;
    }
  }
};
