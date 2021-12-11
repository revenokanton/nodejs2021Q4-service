import fastify from 'fastify';
import { config } from './common/config';
import userRouter from './services/users/user.router';
import taskRouter from './services/task/task.router';
import boardRouter from './services/board/board.router';

export const createServer = async () => {
  const server = fastify({
    logger: true,
  });

  server.register(userRouter);

  server.register(taskRouter);

  server.register(boardRouter);

  await server.ready();

  return server;
};

const startServer = async () => {
  const server = await createServer();

  await server.listen(config.PORT);

  process.on('unhandledRejection', (err) => {
    server.log.error(err);
    process.exit(1);
  });
};

startServer();
