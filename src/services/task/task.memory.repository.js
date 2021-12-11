let tasks = [];

const findAll = (boardId) => tasks.filter((i) => i.boardId === boardId);

const findById = (taskId, boardId) =>
  tasks.find((i) => i.id === taskId && i.boardId === boardId);

const addNewTask = (task) => {
  tasks.push(task);
};

const updateTask = (taskId, boardId, data) => {
  const taskIndex = tasks.findIndex(
    (i) => i.id === taskId && i.boardId === boardId
  );
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...data };
    return tasks[taskIndex];
  }
  return null;
};

const deleteTask = (taskId, boardId) => {
  tasks = tasks.filter((i) => i.id !== taskId || i.boardId !== boardId);
};

const deleteTasksByBoardId = (boardId) => {
  tasks = tasks.filter((i) => i.boardId !== boardId);
};

const deleteUserIdFromTasks = (userId) => {
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
