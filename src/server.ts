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
import { User } from './services/users/user.model';

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

  server
    .addHook('preSerialization', (_request, reply, payload, next) => {
      Object.assign(reply, { payload });
      next();
    })
    .addHook('preHandler', (request, _reply, next) => {
      logRequestBodyInfo(request);
      next();
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
  await createConnection({
    type: 'postgres',
    host: 'db_container',
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: true,
    entities: [User],
  }).then(async () => {
    const server = await createServer();

    await server.listen(config.PORT, '0.0.0.0', () => {
      logServerStart(config.PORT);
    });

    logLoggerLevel();

    await setUpErrorHandlers();
  });
};

startServer();
