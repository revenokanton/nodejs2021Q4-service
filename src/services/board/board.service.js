import boom from 'boom';
import Board from './board.model';
import boardRepo from './board.memory.repository';
import taskRepo from '../task/task.memory.repository';
import { handleNotFound } from '../errors/errors.service';

export const getAllBoards = async (req, reply) => {
  try {
    const boards = await boardRepo.findAll();
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(boards);
  } catch (err) {
    throw boom.boomify(err);
  }
};

export const getBoard = async (req, reply) => {
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
    throw boom.boomify(err);
  }
};

export const addBoard = async (req, reply) => {
  try {
    const board = new Board(req.body);
    await boardRepo.addNewBoard(board);
    reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(board);
  } catch (err) {
    throw boom.boomify(err);
  }
};

export const updateBoard = async (req, reply) => {
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
    throw boom.boomify(err);
  }
};

export const deleteBoard = async (req, reply) => {
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
    throw boom.boomify(err);
  }
};
