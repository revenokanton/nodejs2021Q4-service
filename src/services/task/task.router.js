import {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} from './task.service';

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
    handler: getAllTasks,
  },
  {
    method: 'GET',
    url: '/boards/:boardId/tasks/:taskId',
    handler: getTask,
  },
  {
    method: 'POST',
    url: '/boards/:boardId/tasks',
    handler: addTask,
    schema,
  },
  {
    method: 'PUT',
    url: '/boards/:boardId/tasks/:taskId',
    handler: updateTask,
    schema,
  },
  {
    method: 'DELETE',
    url: '/boards/:boardId/tasks/:taskId',
    handler: deleteTask,
  },
];

export default taskRoutes;
