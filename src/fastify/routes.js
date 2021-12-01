const userRoutes = require('./services/users/user.router');
const boardRoutes = require('./services/board/board.router');

const routes = [...userRoutes, ...boardRoutes];
module.exports = routes;
