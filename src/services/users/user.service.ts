import boom from 'boom';
import { FastifyReply, FastifyRequest } from 'fastify';
import User from './user.model';
import userRepo from './user.memory.repository';
import taskRepo from '../task/task.memory.repository';
import { handleNotFound } from '../errors/errors.service';
import { UserInterface } from './user.model.d';

export type UserRequestType = {
  Body: UserInterface;
  Params: { id: string };
};

export const getAllUsers = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const users = await userRepo.findAll();
    const filteredUsers = users?.map((user) => User.toResponse(user));
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(filteredUsers);
  } catch (err) {
    throw boom.boomify(err as Error);
  }
};

export const getUser = async (
  req: FastifyRequest<UserRequestType>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const id = req?.params?.id;
    const user = await userRepo.findById(id);
    if (user) {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(User.toResponse(user));
    } else {
      handleNotFound(reply, 'user');
    }
  } catch (err) {
    throw boom.boomify(err as Error);
  }
};

export const addUser = async (
  request: FastifyRequest<UserRequestType>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const user = new User(request.body);
    await userRepo.addNewUser(user);
    reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(User.toResponse(user));
  } catch (err) {
    throw boom.boomify(err as Error);
  }
};

export const updateUser = async (
  req: FastifyRequest<UserRequestType>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { id } = req.params;
    const { ...updateData } = req.body;
    const user = await userRepo.updateUser(id, updateData);
    if (user) {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(User.toResponse(user));
    } else {
      handleNotFound(reply, 'user');
    }
  } catch (err) {
    throw boom.boomify(err as Error);
  }
};

export const deleteUser = async (
  req: FastifyRequest<UserRequestType>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await userRepo.deleteUser(id);
    if (user) {
      await taskRepo.deleteUserIdFromTasks(id);
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(User.toResponse(user));
    } else {
      handleNotFound(reply, 'user');
    }
  } catch (err) {
    throw boom.boomify(err as Error);
  }
};
