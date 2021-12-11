import {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  getUser,
} from './user.service';

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
    handler: getAllUsers,
  },
  {
    method: 'GET',
    url: '/users/:id',
    handler: getUser,
  },
  {
    method: 'POST',
    url: '/users',
    handler: addUser,
    schema,
  },
  {
    method: 'PUT',
    url: '/users/:id',
    handler: updateUser,
    schema,
  },
  {
    method: 'DELETE',
    url: '/users/:id',
    handler: deleteUser,
  },
];

export default userRoutes;
