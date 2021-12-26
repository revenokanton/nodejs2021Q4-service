const userRoutes = require('./services/users/user.router');
const boardRoutes = require('./services/board/board.router');
const taskRoutes = require('./services/task/task.router');

const routes = [...userRoutes, ...boardRoutes, ...taskRoutes];
module.exports = routes;
