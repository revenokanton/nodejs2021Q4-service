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

const userRouter = async (fastify: FastifyInstance) => {
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
