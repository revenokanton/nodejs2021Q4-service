import { pino, Logger, TransportMultiOptions } from 'pino';
import { FastifyRequest } from 'fastify';
import { config } from '../../common/config';

const transports = pino.transport(<TransportMultiOptions>{
  targets: [
    {
      target: 'pino/file',
      level: config.LOG_LEVEL,
      options: {
        destination: `${config.LOG_PATH}/access.log`,
        ignore: 'pid,hostname',
        levelFirst: true,
        colorize: true,
      },
    },
    {
      target: 'pino/file',
      level: 'error',
      options: {
        destination: `${config.LOG_PATH}/error.log`,
        ignore: 'pid,hostname',
        colorize: true,
        levelFirst: true,
      },
    },
  ],
});

const logger: Logger = pino(
  {
    level: config.LOG_LEVEL,
    serializers: {
      // The body cannot be serialized inside a req method
      // because the request is serialized when we create the child logger.
      // At that time, the body is not yet parsed.
      req(request) {
        return {
          method: request.method,
          url: request.url,
          path: request.routerPath,
          parameters: request.params,
          headers: request.headers,
          remoteAddress: request.ip,
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
          method: res.method,
          url: res.url,
          path: res.path,
          parameters: res.parameters,
          body: res.payload,
          headers: res.headers,
        };
      },
    },
  },
  transports
);

/**
 * Log server start action
 * @param port - app port to start
 * @return nothing is returned
 */
export const logServerStart = (port: string | number) => {
  console.log(`Server starts on port ${port}`);
};

/**
 * Log current logger level
 * @return nothing is returned
 */
export const logLoggerLevel = () => {
  console.log(`Logging level ${logger.level}`);
};

/**
 * Log request body
 * @param request - Fastify request
 * @return nothing is returned
 */
export const logRequestBodyInfo = (request: FastifyRequest) => {
  logger.info(
    {
      requestId: request.id,
      body: request.body,
    },
    'Parsed request body'
  );
};

export default logger;
