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
    if (data.id) {
      tasks[taskIndex].id = data.id;
    }
    if (data.title) {
      tasks[taskIndex].title = data.title;
    }
    if (data.description) {
      tasks[taskIndex].description = data.description;
    }
    if (data.order) {
      tasks[taskIndex].order = data.order;
    }
    if (data.userId) {
      tasks[taskIndex].userId = data.userId;
    }
    if (data.boardId) {
      tasks[taskIndex].boardId = data.boardId;
    }
    if (data.columnId) {
      tasks[taskIndex].columnId = data.columnId;
    }

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

module.exports = {
  findAll,
  findById,
  addNewTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  deleteUserIdFromTasks,
};
