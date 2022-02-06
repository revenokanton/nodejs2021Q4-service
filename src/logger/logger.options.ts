import * as winston from 'winston';
import { configService } from '../config/config.service';

export const LoggerOptions = {
  level: configService.getLogLevel(),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} | ${info.level} | ${info.message};`
    )
  ),
  transports: [
    new winston.transports.File({ filename: './logs/access.log' }),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
    }),
    new winston.transports.Console({ level: 'info' }),
  ],
};
