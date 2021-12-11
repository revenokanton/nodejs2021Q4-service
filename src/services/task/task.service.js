import boom from 'boom';
import Task from './task.model';
import taskService from './task.memory.repository';
import boardMemory from '../board/board.memory.repository';
import { handleNotFound } from '../errors/errors.service';

export const getAllTasks = async (req, reply) => {
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

export const getTask = async (req, reply) => {
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

export const addTask = async (req, reply) => {
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

export const updateTask = async (req, reply) => {
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

export const deleteTask = async (req, reply) => {
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
