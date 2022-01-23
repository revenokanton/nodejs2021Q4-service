import { FastifyReply } from 'fastify';
import { pino } from 'pino';
import { errorMessages } from './errors.model';
import logger from '../logger/logger.module';

export type EntityType = 'user' | 'board' | 'task' | 'boardTasks';

/**
 * Send error object with error message from database
 * @param reply fastify reply
 * @param entityType type of the entity in error message object
 * @returns Promise void is returned
 */
export const handleNotFound = async (
  reply: FastifyReply,
  entityType: EntityType
): Promise<void> => {
  reply
    .code(404)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ error: errorMessages.NOT_FOUND[entityType] });
};

/**
 * Send error object with error message from database
 * @param reply fastify reply
 * @returns Promise void is returned
 */
export const handleUnauthorized = async (
  reply: FastifyReply
): Promise<void> => {
  reply
    .code(403)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ error: errorMessages.UNAUTHORIZED });
};

export const handleInvalidToken = async (
  reply: FastifyReply
): Promise<void> => {
  reply
    .code(401)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ error: errorMessages.INVALID_TOKEN });
};

/**
 * Set up uncaughtException and unhandledRejection
 * @returns nothing
 */
export const setUpErrorHandlers = () => {
  process.on(
    'uncaughtException',
    pino.final(logger, (err, finalLogger) => {
      finalLogger.error(err, 'uncaughtException');
      process.exit(1);
    })
  );

  process.on(
    'unhandledRejection',
    pino.final(logger, (err, finalLogger) => {
      finalLogger.error(err, 'unhandledRejection');
      process.exit(1);
    })
  );
};
