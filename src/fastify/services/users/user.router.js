const userController = require('./user.service');

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
  },
  {
    method: 'PUT',
    url: '/users/:id',
    handler: userController.updateUser,
  },
  {
    method: 'DELETE',
    url: '/users/:id',
    handler: userController.deleteUser,
  },
];

module.exports = userRoutes;
