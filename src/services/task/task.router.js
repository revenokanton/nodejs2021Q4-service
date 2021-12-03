const taskController = require('./task.service');

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
    handler: taskController.getAllTasks,
  },
  {
    method: 'GET',
    url: '/boards/:boardId/tasks/:taskId',
    handler: taskController.getTask,
  },
  {
    method: 'POST',
    url: '/boards/:boardId/tasks',
    handler: taskController.addTask,
    schema,
  },
  {
    method: 'PUT',
    url: '/boards/:boardId/tasks/:taskId',
    handler: taskController.updateTask,
    schema,
  },
  {
    method: 'DELETE',
    url: '/boards/:boardId/tasks/:taskId',
    handler: taskController.deleteTask,
  },
];

module.exports = taskRoutes;
