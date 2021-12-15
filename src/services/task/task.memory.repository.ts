import { TaskInterface } from './task.model';

let tasks: TaskInterface[] = [];

/**
 * Returns all tasks from temporary db with provided boardId
 * @param boardId - ID of the board to which the tasks belong
 * @returns tasks array with provided boardId from temporary db
 */
const findAll = async (boardId: string): Promise<TaskInterface[]> =>
  tasks.filter((i) => i.boardId === boardId);

/**
 * Returns task from temporary db with provided taskId and boardId
 * @param taskId - id of the task
 * @param boardId - ID of the board to which the tasks belong
 * @returns task with provided boardId and taskId
 * or undefined if no such task found
 */
const findById = async (
  taskId: string,
  boardId: string
): Promise<TaskInterface | undefined> =>
  tasks.find((i) => i.id === taskId && i.boardId === boardId);

/**
 * Add new task to the tasks from temporary db
 * @param task - object with task fields
 * @returns Nothing is returned.
 */
const addNewTask = async (task: TaskInterface): Promise<void> => {
  tasks.push(task);
};

/**
 * Updates task from temporary db with provided taskId and boardId
 * @param taskId - id of the task
 * @param boardId - ID of the board to which the tasks belong
 * @param data - object with parameters which should be updated in current task
 * @returns task with updated fields according to the transmitted taskId and boardId
 * or null if no such task found
 */
const updateTask = async (
  taskId: string,
  boardId: string,
  data: TaskInterface
): Promise<TaskInterface | null> => {
  const taskIndex = tasks.findIndex(
    (i) => i.id === taskId && i.boardId === boardId
  );
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...data };
    return tasks[taskIndex];
  }
  return null;
};

/**
 * Deletes task from temporary db with provided taskId and boardId
 * @param taskId - id of the task
 * @param boardId - ID of the board to which the tasks belong
 * @returns Promise void is returned
 */
const deleteTask = async (taskId: string, boardId: string): Promise<void> => {
  tasks = tasks.filter((i) => i.id !== taskId || i.boardId !== boardId);
};

/**
 * Deletes all tasks from temporary db with provided boardId
 * @param boardId - ID of the board to which the tasks belong
 * @returns Promise void is returned
 */
const deleteTasksByBoardId = async (boardId: string): Promise<void> => {
  tasks = tasks.filter((i) => i.boardId !== boardId);
};

/**
 * Set userId to null for all tasks with provided userId
 * @param userId - ID of the user
 * @returns Promise void is returned
 */
const deleteUserIdFromTasks = async (userId: string): Promise<void> => {
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
