import { FastifyReply, FastifyRequest } from 'fastify';
import { userAuthorization } from './login.controller';
import { handleUnauthorized } from '../errors/errors.service';

export type LoginRequestType = {
  Body: { login: string; password: string };
};

/**
 * Auth user with login and password
 * @param request - fastify request
 * @param reply fastify reply
 * @returns Promise void is returned
 */
export const authUser = async (
  request: FastifyRequest<LoginRequestType>,
  reply: FastifyReply
) => {
  const authJwt = await userAuthorization(request.body);

  if (authJwt) {
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(authJwt);
  } else {
    await handleUnauthorized(reply);
  }
};
