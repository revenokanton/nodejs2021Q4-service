import { FastifyInstance } from 'fastify';
import {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} from './task.service';

const schema = {
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      order: { type: 'number' },
      userId: { type: 'string' },
      boardId: { type: 'string' },
      columnId: { type: 'string' },
    },
  },
};

/**
 * Set up routes for tasks resources
 * @param fastify - instance of the fastify framework
 * @returns Promise void is returned.
 */
const taskRouter = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/boards/:boardId/tasks',
    handler: getAllTasks,
  });

  fastify.route({
    method: 'GET',
    url: '/boards/:boardId/tasks/:taskId',
    handler: getTask,
  });

  fastify.route({
    method: 'POST',
    url: '/boards/:boardId/tasks',
    handler: addTask,
    schema,
  });

  fastify.route({
    method: 'PUT',
    url: '/boards/:boardId/tasks/:taskId',
    handler: updateTask,
    schema,
  });

  fastify.route({
    method: 'DELETE',
    url: '/boards/:boardId/tasks/:taskId',
    handler: deleteTask,
  });
};

export default taskRouter;
