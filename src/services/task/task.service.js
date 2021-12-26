const boom = require('boom');
const Task = require('./task.model');
const taskService = require('./task.memory.repository');
const boardMemory = require('../board/board.memory.repository');
const { handleNotFound } = require('../errors/errors.service');

exports.getAllTasks = async (req, reply) => {
  try {
    const boardId = req?.params?.boardId;
    const tasks = await taskService.findAll(boardId);
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(tasks);
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getTask = async (req, reply) => {
  try {
    const taskId = req?.params?.taskId;
    const boardId = req?.params?.boardId;
    const task = await taskService.findById(taskId, boardId);

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

exports.addTask = async (req, reply) => {
  try {
    const boardId = req?.params?.boardId;
    const board = await boardMemory.findById(boardId);

    if (board) {
      const taskData = { ...req.body, boardId };
      const task = new Task(taskData);
      await taskService.addNewTask(task);
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

exports.updateTask = async (req, reply) => {
  try {
    const taskId = req?.params?.taskId;
    const boardId = req?.params?.boardId;
    const updatedData = new Task(req.body);
    const task = await taskService.updateTask(taskId, boardId, updatedData);

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

exports.deleteTask = async (req, reply) => {
  try {
    const taskId = req?.params?.taskId;
    const boardId = req?.params?.boardId;
    const task = await taskService.findById(taskId, boardId);
    if (task) {
      await taskService.deleteTask(taskId, boardId);
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
