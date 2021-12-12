import { FastifyInstance } from 'fastify';
import {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  getUser,
} from './user.service';

const schema = {
  body: {
    type: 'object',
    required: ['name', 'password', 'login'],
    properties: {
      name: { type: 'string' },
      password: { type: 'string' },
      login: { type: 'string' },
    },
  },
};

/**
 * Set up routes for user resources
 * @param fastify - instance of the fastify framework
 * @returns Nothing is returned.
 */
const userRouter = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/users',
    handler: getAllUsers,
  });

  fastify.route({
    method: 'GET',
    url: '/users/:id',
    handler: getUser,
  });

  fastify.route({
    method: 'POST',
    url: '/users',
    handler: addUser,
    schema,
  });

  fastify.route({
    method: 'PUT',
    url: '/users/:id',
    handler: updateUser,
    schema,
  });

  fastify.route({
    method: 'DELETE',
    url: '/users/:id',
    handler: deleteUser,
  });
};

export default userRouter;
