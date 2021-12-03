const boardService = require('./board.service');

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
    handler: boardService.getAllBoards,
  },
  {
    method: 'GET',
    url: '/boards/:id',
    handler: boardService.getBoard,
  },
  {
    method: 'POST',
    url: '/boards',
    handler: boardService.addBoard,
    schema,
  },
  {
    method: 'PUT',
    url: '/boards/:id',
    handler: boardService.updateBoard,
    schema,
  },
  {
    method: 'DELETE',
    url: '/boards/:id',
    handler: boardService.deleteBoard,
  },
];

module.exports = boardRoutes;
