let tasks = [];

const findAll = () => tasks;

const findById = (id, boardId) =>
  tasks.find((i) => i.id === id && i.boardId === boardId);

const addNewTask = (task) => {
  tasks.push(task);
};

const updateTask = (id, boardId, data) => {
  const taskIndex = tasks.findIndex((i) => i.id === id && i.boardId === id);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...data };
    return tasks[taskIndex];
  }
  return null;
};

const deleteTask = (id, boardId) => {
  const task = findById(id, boardId);
  if (task) {
    tasks = [...tasks.filter((i) => i.id !== id && i.boardId !== boardId)];
  }
  return null;
};

module.exports = {
  findAll,
  findById,
  addNewTask,
  updateTask,
  deleteTask,
};
