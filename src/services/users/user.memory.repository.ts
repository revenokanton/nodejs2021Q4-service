import { UserInterface } from './user.model';

let users: UserInterface[] = [];

/**
 * Returns all users from repository
 * @returns users array from temporary db
 */
const findAll = () => users;

/**
 * Returns user with provided id
 * @param id id of the user
 * @returns user according to the transmitted id or undefined
 */
const findById = (id: string) => users.find((i) => i.id === id);

/**
 * Add new user to the users repository
 * @param user object with user fields
 * @returns Nothing is returned.
 */
const addNewUser = (user: UserInterface) => {
  users.push(user);
};

/**
 * Updates user with provided id according to provided data
 * @param id id of the user
 * @param data object with parameters which should be updated for current user
 * @returns user with updated fields according to the transmitted id or null
 */
const updateUser = (id: string, data: UserInterface) => {
  const userIndex = users.findIndex((i) => i.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...data };
    return users[userIndex];
  }
  return null;
};

/**
 * Delete user with provided id
 * @param id id of the user
 * @returns user which was deleted or null
 */
const deleteUser = (id: string) => {
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
