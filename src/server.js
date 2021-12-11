import fastify from 'fastify';
import config from './common/config';
import routes from './routes';

const server = fastify({
  logger: true,
});

routes.forEach((route) => {
  server.route(route);
});

const start = async () => {
  try {
    await server.listen(config.PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
