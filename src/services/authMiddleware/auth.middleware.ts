import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import jwt from 'jsonwebtoken';
import { config } from '../../common/config';
import { handleInvalidToken } from '../errors/errors.service';

export type AuthMiddlewareHeaders = {
  Headers: {
    Authorization: string;
  };
};

export const authMiddleware = async (
  request: FastifyRequest<AuthMiddlewareHeaders> | FastifyRequest,
  reply: FastifyReply,
  next: HookHandlerDoneFunction
) => {
  const authHeader = String(request?.headers?.Authorization || '');
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length);
    const secret = config.JWT_SECRET_KEY as string;
    const verified = jwt.verify(token, secret);

    if (verified) {
      next();
    } else {
      await handleInvalidToken(reply);
    }
  } else {
    await handleInvalidToken(reply);
  }
};
