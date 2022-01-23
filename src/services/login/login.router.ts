import { FastifyInstance } from 'fastify';
import { authUser } from './login.service';

const schema = {
  body: {
    type: 'object',
    required: ['password', 'login'],
    properties: {
      password: { type: 'string' },
      login: { type: 'string' },
    },
  },
};

/**
 * Set up routes for login
 * @param fastify - instance of the fastify framework
 * @returns Promise void is returned
 */
const loginRouter = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: 'POST',
    url: '/login',
    handler: authUser,
    schema,
  });
};

export default loginRouter;
