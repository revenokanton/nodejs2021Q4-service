import { FastifyInstance } from 'fastify';
import {
  getBoard,
  updateBoard,
  addBoard,
  deleteBoard,
  getAllBoards,
} from './board.service';

const schema = {
  body: {
    type: 'object',
    required: ['title', 'columns'],
    properties: {
      title: { type: 'string' },
      columns: { type: 'array', default: [] },
    },
  },
};

/**
 * Set up routes for boards resources
 * @param fastify - instance of the fastify framework
 * @returns Promise void is returned
 */
const boardRouter = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/boards',
    handler: getAllBoards,
  });

  fastify.route({
    method: 'GET',
    url: '/boards/:id',
    handler: getBoard,
  });
  fastify.route({
    method: 'POST',
    url: '/boards',
    handler: addBoard,
    schema,
  });
  fastify.route({
    method: 'PUT',
    url: '/boards/:id',
    handler: updateBoard,
    schema,
  });
  fastify.route({
    method: 'DELETE',
    url: '/boards/:id',
    handler: deleteBoard,
  });
};

export default boardRouter;
