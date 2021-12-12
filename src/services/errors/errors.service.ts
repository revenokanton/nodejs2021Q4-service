import { FastifyReply } from 'fastify';
import { errorMessages } from './errors.model';

export type EntityType = 'user' | 'board' | 'task' | 'boardTasks';

export const handleNotFound = async (
  reply: FastifyReply,
  entityType: EntityType
) => {
  reply
    .code(404)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ error: errorMessages.NOT_FOUND[entityType] });
};
