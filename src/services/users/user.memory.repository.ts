import { UserInterface } from './user.model';

let users: UserInterface[] = [];

/**
 * Returns all users from temporary db
 * @returns users array from temporary db
 */
const findAll = (): UserInterface[] => users;

/**
 * Returns user with provided id from temporary db
 * @param id - id of the user
 * @returns user according to the transmitted id or undefined if no such user found
 */
const findById = (id: string): UserInterface | undefined =>
  users.find((i) => i.id === id);

/**
 * Add new user to the users temporary db
 * @param user - object with user fields
 * @returns Nothing is returned.
 */
const addNewUser = (user: UserInterface): void => {
  users.push(user);
};

/**
 * Updates user with provided id according to provided data
 * @param id - id of the user
 * @param data - object with parameters which should be updated in current user
 * @returns user with updated fields according to the transmitted id or null if no such user found
 */
const updateUser = (id: string, data: UserInterface): UserInterface | null => {
  const userIndex = users.findIndex((i) => i.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...data };
    return users[userIndex];
  }
  return null;
};

/**
 * Delete user with provided id from temporary db
 * @param id - id of the user
 * @returns user which was deleted or null if no such user found
 */
const deleteUser = (id: string): UserInterface | null => {
  const user = findById(id);
  if (user) {
    users = [...users.filter((i) => i.id !== id)];
    return user;
  }
  return null;
};

export default {
  findAll,
  findById,
  addNewUser,
  updateUser,
  deleteUser,
};