export type NotFoundType = {
  user: string;
  board: string;
  task: string;
  boardTasks: string;
};

export type ErrorMessagesType = {
  NOT_FOUND: NotFoundType;
  UNAUTHORIZED: string;
  INVALID_TOKEN: string;
};

export const errorMessages: ErrorMessagesType = {
  NOT_FOUND: {
    user: 'No user with given id.',
    board: 'No board with given id.',
    task: 'No task with given id.',
    boardTasks: 'No tasks with given boardId',
  },

  UNAUTHORIZED: 'Forbidden',
  INVALID_TOKEN: 'Invalid token',
};
