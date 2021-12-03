const boom = require('boom');
const User = require('./user.model');
const userRepo = require('./user.memory.repository');
const taskRepo = require('../task/task.memory.repository');
const { handleNotFound } = require('../errors/errors.service');

exports.getAllUsers = async (req, reply) => {
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

exports.getUser = async (req, reply) => {
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

exports.addUser = async (req, reply) => {
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

exports.updateUser = async (req, reply) => {
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

exports.deleteUser = async (req, reply) => {
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
