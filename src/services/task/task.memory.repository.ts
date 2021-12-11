import { TaskInterface } from './task.model.d';

let tasks: TaskInterface[] = [];

const findAll = (boardId: string) => tasks.filter((i) => i.boardId === boardId);

const findById = (taskId: string, boardId: string) =>
  tasks.find((i) => i.id === taskId && i.boardId === boardId);

const addNewTask = (task: TaskInterface) => {
  tasks.push(task);
};

const updateTask = (taskId: string, boardId: string, data: TaskInterface) => {
  const taskIndex = tasks.findIndex(
    (i) => i.id === taskId && i.boardId === boardId
  );
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...data };
    return tasks[taskIndex];
  }
  return null;
};

const deleteTask = (taskId: string, boardId: string) => {
  tasks = tasks.filter((i) => i.id !== taskId || i.boardId !== boardId);
};

const deleteTasksByBoardId = (boardId: string) => {
  tasks = tasks.filter((i) => i.boardId !== boardId);
};

const deleteUserIdFromTasks = (userId: string) => {
  tasks.forEach((task, index) => {
    if (task.userId === userId) {
      tasks[index].userId = null;
    }
  });
};

export default {
  findAll,
  findById,
  addNewTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  deleteUserIdFromTasks,
};
