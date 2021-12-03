const boom = require('boom');
const Task = require('./task.model');
const {
  findAll,
  findById,
  addNewTask,
  updateTask,
  deleteTask,
} = require('./task.memory.repository');
const boardMemory = require('../board/board.memory.repository');
const { handleNotFound } = require('../errors/errors.service');

exports.getAllTasks = (req, reply) => {
  try {
    const boardId = req?.params?.boardId;
    const tasks = findAll(boardId);
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(tasks);
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getTask = (req, reply) => {
  try {
    const taskId = req?.params?.taskId;
    const boardId = req?.params?.boardId;
    const task = findById(taskId, boardId);

    if (task) {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(task);
    } else {
      handleNotFound(reply, 'task');
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.addTask = (req, reply) => {
  try {
    const boardId = req?.params?.boardId;
    const board = boardMemory.findById(boardId);

    if (board) {
      const taskData = { ...req.body, boardId };
      const task = new Task(taskData);
      addNewTask(task);
      reply
        .code(201)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(task);
    } else {
      handleNotFound(reply, 'board');
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.updateTask = (req, reply) => {
  try {
    const taskId = req?.params?.taskId;
    const boardId = req?.params?.boardId;
    const updatedData = new Task(req.body);
    const task = updateTask(taskId, boardId, updatedData);

    if (task) {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(task);
    } else {
      handleNotFound(reply, 'task');
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.deleteTask = (req, reply) => {
  try {
    const taskId = req?.params?.taskId;
    const boardId = req?.params?.boardId;
    const task = findById(taskId, boardId);
    if (task) {
      deleteTask(taskId, boardId);
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(task);
    } else {
      handleNotFound(reply, 'task');
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};
