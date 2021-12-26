const fastify = require('fastify')({
  logger: true,
});

const { PORT } = require('./common/config');

const routes = require('./routes');

routes.forEach((route) => {
  fastify.route(route);
});

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
