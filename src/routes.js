import userRoutes from './services/users/user.router';
import boardRoutes from './services/board/board.router';
import taskRoutes from './services/task/task.router';

export default [...userRoutes, ...boardRoutes, ...taskRoutes];
