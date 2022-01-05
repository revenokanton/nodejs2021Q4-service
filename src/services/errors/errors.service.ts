import { FastifyReply } from 'fastify';
import { errorMessages } from './errors.model';

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
