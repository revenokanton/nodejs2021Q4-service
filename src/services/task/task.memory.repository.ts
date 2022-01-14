import { getRepository } from 'typeorm';
import { Task, TaskInterface } from './task.model';

/**
 * Returns all tasks from temporary db with provided boardId
 * @param boardId - ID of the board to which the tasks belong
 * @returns Promise to tasks array with provided boardId from temporary db
 */
const findAll = async (boardId: string): Promise<TaskInterface[]> =>
  getRepository(Task).find({ boardId });

/**
 * Returns task from temporary db with provided taskId and boardId
 * @param taskId - id of the task
 * @param boardId - ID of the board to which the tasks belong
 * @returns Promise to task with provided boardId and taskId
 * or undefined if no such task found
 */
const findById = async (
  taskId: string,
  boardId: string
): Promise<TaskInterface | undefined> =>
  getRepository(Task).findOne({ id: taskId, boardId });

/**
 * Add new task to the tasks from temporary db
 * @param task - object with task fields
 * @returns Promise void is returned
 */
const addNewTask = async (task: TaskInterface): Promise<Task> =>
  getRepository(Task).save(task);

/**
 * Updates task from temporary db with provided taskId and boardId
 * @param taskId - id of the task
 * @param boardId - ID of the board to which the tasks belong
 * @param data - object with parameters which should be updated in current task
 * @returns Promise to task with updated fields according to the transmitted taskId and boardId
 * or null if no such task found
 */
const updateTask = async (
  taskId: string,
  boardId: string,
  data: TaskInterface
): Promise<TaskInterface | null> => {
  const existingTask = await getRepository(Task).findOne({
    id: taskId,
    boardId,
  });
  if (existingTask) {
    const taskToUpdate = { ...existingTask, ...data };
    return getRepository(Task).save(taskToUpdate);
  }
  return null;
};

/**
 * Deletes task from temporary db with provided taskId and boardId
 * @param taskId - id of the task
 * @param boardId - ID of the board to which the tasks belong
 * @returns Promise void is returned
 */
const deleteTask = async (
  taskId: string,
  boardId: string
): Promise<TaskInterface | null> => {
  const taskToDelete = await getRepository(Task).findOne({
    id: taskId,
    boardId,
  });

  if (taskToDelete) {
    return getRepository(Task).remove(taskToDelete);
  }
  return null;
};

/**
 * Deletes all tasks from temporary db with provided boardId
 * @param boardId - ID of the board to which the tasks belong
 * @returns Promise void is returned
 */
const deleteTasksByBoardId = async (
  boardId: string
): Promise<TaskInterface[] | null> => {
  const tasksToDelete = await getRepository(Task).find({ boardId });
  if (tasksToDelete.length) {
    return getRepository(Task).remove(tasksToDelete);
  }
  return null;
};

export default {
  findAll,
  findById,
  addNewTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
};
