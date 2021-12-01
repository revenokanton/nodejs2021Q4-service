const boardController = require('./board.service');

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
    handler: boardController.getAllBoards,
  },
  {
    method: 'GET',
    url: '/boards/:id',
    handler: boardController.getBoard,
  },
  {
    method: 'POST',
    url: '/boards',
    handler: boardController.addBoard,
    schema,
  },
  {
    method: 'PUT',
    url: '/boards/:id',
    handler: boardController.updateBoard,
    schema,
  },
  {
    method: 'DELETE',
    url: '/boards/:id',
    handler: boardController.deleteBoard,
  },
];

module.exports = boardRoutes;
