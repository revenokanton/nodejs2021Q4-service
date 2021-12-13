import { FastifyReply, FastifyRequest } from 'fastify';
import { Task, TaskInterface } from './task.model';
import taskService from './task.memory.repository';
import boardMemory from '../board/board.memory.repository';
import { handleNotFound } from '../errors/errors.service';

export type TaskRequestType = {
  Params: { taskId: string; boardId: string };
  Body: TaskInterface;
};

export const getAllTasks = async (
  req: FastifyRequest<TaskRequestType>,
  reply: FastifyReply
): Promise<void> => {
  const boardId = req?.params?.boardId;
  const tasks = await taskService.findAll(boardId);
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(tasks);
};

export const getTask = async (
  req: FastifyRequest<TaskRequestType>,
  reply: FastifyReply
): Promise<void> => {
  const taskId = req?.params?.taskId;
  const boardId = req?.params?.boardId;
  const task = await taskService.findById(taskId, boardId);

  if (task) {
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(task);
  } else {
    await handleNotFound(reply, 'task');
  }
};

export const addTask = async (
  req: FastifyRequest<TaskRequestType>,
  reply: FastifyReply
): Promise<void> => {
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
    await handleNotFound(reply, 'board');
  }
};

export const updateTask = async (
  req: FastifyRequest<TaskRequestType>,
  reply: FastifyReply
): Promise<void> => {
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
    await handleNotFound(reply, 'task');
  }
};

export const deleteTask = async (
  req: FastifyRequest<TaskRequestType>,
  reply: FastifyReply
): Promise<void> => {
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
    await handleNotFound(reply, 'task');
  }
};
