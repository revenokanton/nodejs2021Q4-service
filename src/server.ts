import fastify, {
  FastifyInstance,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyLoggerInstance,
} from 'fastify';
import * as http from 'http';
import { createConnection } from 'typeorm';
import { config } from './common/config';
import userRouter from './services/users/user.router';
import taskRouter from './services/task/task.router';
import boardRouter from './services/board/board.router';
import { setUpErrorHandlers } from './services/errors/errors.service';
import 'reflect-metadata';
import logger, {
  logLoggerLevel,
  logRequestBodyInfo,
  logServerStart,
} from './services/logger/logger.module';
import ormconfig from './db/ormconfig';
import { addRootUser } from './services/users/user.service';
import loginRouter from './services/login/login.router';
import { authMiddleware } from './services/authMiddleware/auth.middleware';

/**
 * Create an instance of the fastify server
 * @returns Promise to server instance
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
    logger,
  });

  server.register(userRouter);

  server.register(taskRouter);

  server.register(boardRouter);

  server.register(loginRouter);

  server
    .addHook('preSerialization', (_request, reply, payload, next) => {
      Object.assign(reply, { payload });
      next();
    })
    .addHook('preHandler', async (request, reply, next) => {
      logRequestBodyInfo(request);
      const nonAuthPaths = ['/login', '/doc', '/'];
      if (nonAuthPaths.includes(request.routerPath)) {
        next();
      } else {
        await authMiddleware(request, reply, next);
      }
    })
    .addHook('onSend', (_request, reply, payload, next) => {
      Object.assign(reply, { payload });
      next();
    });

  await server.ready();

  return server;
};

/**
 * Start server on port from config object
 * @returns Promise void is returned
 */
const startServer = async (): Promise<void> => {
  await createConnection(ormconfig).then(async (connection) => {
    await connection.runMigrations();

    const server = await createServer();

    await server.listen(config.PORT, '0.0.0.0', () => {
      logServerStart(config.PORT);
    });

    logLoggerLevel();

    await setUpErrorHandlers();

    await addRootUser();
  });
};

startServer();
