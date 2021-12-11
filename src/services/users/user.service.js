import boom from 'boom';
import User from './user.model';
import userRepo from './user.memory.repository';
import taskRepo from '../task/task.memory.repository';
import { handleNotFound } from '../errors/errors.service';

export const getAllUsers = async (req, reply) => {
  try {
    const users = await userRepo.findAll();
    const filteredUsers = users?.map((user) => User.toResponse(user));
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(filteredUsers);
  } catch (err) {
    throw boom.boomify(err);
  }
};

export const getUser = async (req, reply) => {
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
    throw boom.boomify(err);
  }
};

export const addUser = async (req, reply) => {
  try {
    const user = new User(req.body);
    await userRepo.addNewUser(user);
    reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(User.toResponse(user));
  } catch (err) {
    throw boom.boomify(err);
  }
};

export const updateUser = async (req, reply) => {
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
    throw boom.boomify(err);
  }
};

export const deleteUser = async (req, reply) => {
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
    throw boom.boomify(err);
  }
};
