const boom = require('boom');
const User = require('./user.model');
const {
  findAll,
  findById,
  addNewUser,
  updateUser,
  deleteUser,
} = require('./user.memory.repository');

exports.getAllUsers = (req, reply) => {
  try {
    const users = findAll();
    const filteredUsers = users?.map((user) => User.toResponse(user));
    reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(filteredUsers);
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getUser = (req, reply) => {
  try {
    const id = req?.params?.id;
    const user = findById(id);
    if (user) {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(User.toResponse(user));
    } else {
      reply
        .code(404)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ error: 'No user with given id.' });
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.addUser = (req, reply) => {
  try {
    const user = new User(req.body);
    addNewUser(user);
    reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(User.toResponse(user));
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.updateUser = (req, reply) => {
  try {
    const { id } = req.params;
    const { ...updateData } = req.body;
    const user = updateUser(id, updateData);
    if (user) {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(User.toResponse(user));
    } else {
      reply
        .code(404)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ error: 'No user with given id.' });
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.deleteUser = async (req, reply) => {
  try {
    const { id } = req.params;
    const user = deleteUser(id);
    if (user) {
      reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(User.toResponse(user));
    } else {
      reply
        .code(404)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ error: 'No user with given id.' });
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};
