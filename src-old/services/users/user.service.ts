import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { User, UserInterface } from './user.model';
import userRepo from './user.memory.repository';
import { handleNotFound } from '../errors/errors.service';

export type UserRequestType = {
  Body: UserInterface;
  Params: { id: string };
};

/**
 * Send all users from database
 * @param _ - fastify request
 * @param reply fastify reply
 * @returns Promise void is returned
 */
export const getAllUsers = async (
  _: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const users = await userRepo.findAll();
  const filteredUsers = users?.map((user) => User.toResponse(user));
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(filteredUsers);
};

/**
 * Send user regarding provided id
 * @param req - fastify request with user request parameters
 * @param reply fastify reply
 * @returns Promise void is returned
 */
export const getUser = async (
  req: FastifyRequest<UserRequestType>,
  reply: FastifyReply
): Promise<void> => {
  const id = req?.params?.id;
  const user = await userRepo.findById(id);
  if (user) {
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(User.toResponse(user));
  } else {
    await handleNotFound(reply, 'user');
  }
};

/**
 * Add user to database and send added user data
 * @param req - fastify request with user request parameters
 * @param reply fastify reply
 * @returns Promise void is returned
 */
export const addUser = async (
  req: FastifyRequest<UserRequestType>,
  reply: FastifyReply
) => {
  const user = await userRepo.addNewUser(req.body);
  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(User.toResponse(user));
};

/**
 * Add user to database and send added user data
 * @returns Promise void is returned
 */
export const addRootUser = async () => {
  await userRepo.addNewUser({
    id: uuidv4(),
    name: 'admin',
    login: 'admin',
    password: 'admin',
  });
};

/**
 * Update user with parameters regarding provided id to database
 * and send updated user data
 * @param req - fastify request with user request parameters
 * @param reply fastify reply
 * @returns Promise void is returned
 */
export const updateUser = async (
  req: FastifyRequest<UserRequestType>,
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  const { ...updateData } = req.body;
  const user = await userRepo.updateUser(id, updateData);
  if (user) {
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(User.toResponse(user));
  } else {
    await handleNotFound(reply, 'user');
  }
};

/**
 * Delete user regarding provided id from database
 * and send deleted user data
 * @param req - fastify request with user request parameters
 * @param reply fastify reply
 * @returns Promise void is returned
 */
export const deleteUser = async (
  req: FastifyRequest<UserRequestType>,
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  const user = await userRepo.deleteUser(id);
  if (user) {
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(User.toResponse(user));
  } else {
    await handleNotFound(reply, 'user');
  }
};
