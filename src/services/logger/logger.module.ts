import { pino, Logger, TransportMultiOptions } from 'pino';
import { config } from '../../common/config';

const transports = pino.transport(<TransportMultiOptions>{
  level: config.LOG_LEVEL,
  targets: [
    {
      target: 'pino/file',
      level: config.LOG_LEVEL,
      options: {
        destination: `${config.LOG_PATH}/access.log`,
        ignore: 'pid,hostname',
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
      },
    },
  ],
});

const logger: Logger = pino(transports);

export default logger;
