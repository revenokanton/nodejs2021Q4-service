import fastify, {
  FastifyInstance,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyLoggerInstance,
} from 'fastify';
import * as http from 'http';
import { config } from './common/config';
import userRouter from './services/users/user.router';
import taskRouter from './services/task/task.router';
import boardRouter from './services/board/board.router';

/**
 * Create an instance of the fastify server
 * @returns server instance
 */
export const createServer = async (): Promise<
  FastifyInstance<
    http.Server,
    RawRequestDefaultExpression<http.Server>,
    RawReplyDefaultExpression<http.Server>,
    FastifyLoggerInstance
  > &
    PromiseLike<
      FastifyInstance<
        http.Server,
        RawRequestDefaultExpression<http.Server>,
        RawReplyDefaultExpression<http.Server>,
        FastifyLoggerInstance
      >
    >
> => {
  const server = fastify({
    logger: true,
  });

  server.register(userRouter);

  server.register(taskRouter);

  server.register(boardRouter);

  await server.ready();

  return server;
};

/**
 * Start server on port from config object
 * @returns Promise void is returned
 */
const startServer = async (): Promise<void> => {
  const server = await createServer();

  await server.listen(config.PORT);

  process.on('unhandledRejection', (err) => {
    server.log.error(err);
    process.exit(1);
  });
};

startServer();
