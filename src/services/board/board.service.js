const boom = require('boom');
const Board = require('./board.model');
const {
  findAll,
  findById,
  addNewBoard,
  updateBoard,
  deleteBoard,
} = require('./board.memory.repository');
const { handleNotFound } = require('../errors/errors.service');

exports.getAllBoards = (req, reply) => {
  try {
    const boards = findAll();
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(boards);
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getBoard = (req, reply) => {
  try {
    const id = req?.params?.id;
    const board = findById(id);
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

exports.addBoard = (req, reply) => {
  try {
    const board = new Board(req.body);
    addNewBoard(board);
    reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(board);
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.updateBoard = (req, reply) => {
  try {
    const { id } = req.params;
    const { ...updateData } = req.body;
    const board = updateBoard(id, updateData);
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

exports.deleteBoard = async (req, reply) => {
  try {
    const { id } = req.params;
    const board = deleteBoard(id);
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
