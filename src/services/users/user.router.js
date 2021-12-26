const userController = require('./user.service');

const schema = {
  body: {
    type: 'object',
    required: ['name', 'password', 'login'],
    properties: {
      name: { type: 'string' },
      password: { type: 'string' },
      login: { type: 'string' },
    },
  },
};

const userRoutes = [
  {
    method: 'GET',
    url: '/users',
    handler: userController.getAllUsers,
  },
  {
    method: 'GET',
    url: '/users/:id',
    handler: userController.getUser,
  },
  {
    method: 'POST',
    url: '/users',
    handler: userController.addUser,
    schema,
  },
  {
    method: 'PUT',
    url: '/users/:id',
    handler: userController.updateUser,
    schema,
  },
  {
    method: 'DELETE',
    url: '/users/:id',
    handler: userController.deleteUser,
  },
];

module.exports = userRoutes;
