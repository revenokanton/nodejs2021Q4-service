import {
  getBoard,
  updateBoard,
  addBoard,
  deleteBoard,
  getAllBoards,
} from './board.service';

const schema = {
  body: {
    type: 'object',
    required: ['title', 'columns'],
    properties: {
      title: { type: 'string' },
      columns: { type: 'array', default: [] },
    },
  },
};

const boardRoutes = [
  {
    method: 'GET',
    url: '/boards',
    handler: getAllBoards,
  },
  {
    method: 'GET',
    url: '/boards/:id',
    handler: getBoard,
  },
  {
    method: 'POST',
    url: '/boards',
    handler: addBoard,
    schema,
  },
  {
    method: 'PUT',
    url: '/boards/:id',
    handler: updateBoard,
    schema,
  },
  {
    method: 'DELETE',
    url: '/boards/:id',
    handler: deleteBoard,
  },
];

export default boardRoutes;
