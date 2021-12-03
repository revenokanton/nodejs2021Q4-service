const taskService = require('./task.service');

const schema = {
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      order: { type: 'number' },
      userId: { type: 'string' },
      boardId: { type: 'string' },
      columnId: { type: 'string' },
    },
  },
};

const taskRoutes = [
  {
    method: 'GET',
    url: '/boards/:boardId/tasks',
    handler: taskService.getAllTasks,
  },
  {
    method: 'GET',
    url: '/boards/:boardId/tasks/:taskId',
    handler: taskService.getTask,
  },
  {
    method: 'POST',
    url: '/boards/:boardId/tasks',
    handler: taskService.addTask,
    schema,
  },
  {
    method: 'PUT',
    url: '/boards/:boardId/tasks/:taskId',
    handler: taskService.updateTask,
    schema,
  },
  {
    method: 'DELETE',
    url: '/boards/:boardId/tasks/:taskId',
    handler: taskService.deleteTask,
  },
];

module.exports = taskRoutes;
