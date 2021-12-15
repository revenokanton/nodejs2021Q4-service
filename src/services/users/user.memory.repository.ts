import { UserInterface } from './user.model';

let users: UserInterface[] = [];

/**
 * Returns all users from temporary db
 * @returns Promise to users array from temporary db
 */
const findAll = async (): Promise<UserInterface[]> => users;

/**
 * Returns user with provided id from temporary db
 * @param id - id of the user
 * @returns Promise to user according to the transmitted id or undefined if no such user found
 */
const findById = async (id: string): Promise<UserInterface | undefined> =>
  users.find((i) => i.id === id);

/**
 * Add new user to the users temporary db
 * @param user - object with user fields
 * @returns Promise void is returned
 */
const addNewUser = async (user: UserInterface): Promise<void> => {
  users.push(user);
};

/**
 * Updates user with provided id according to provided data
 * @param id - id of the user
 * @param data - object with parameters which should be updated in current user
 * @returns Promise to user with updated fields according to the transmitted id or null if no such user found
 */
const updateUser = async (
  id: string,
  data: UserInterface
): Promise<UserInterface | null> => {
  const userIndex = users.findIndex((i) => i.id === id);
  if (users[userIndex]) {
    users[userIndex] = { ...users[userIndex], ...data };
    return users[userIndex];
  }
  return null;
};

/**
 * Delete user with provided id from temporary db
 * @param id - id of the user
 * @returns Promise to user which was deleted or null if no such user found
 */
const deleteUser = async (id: string): Promise<UserInterface | null> => {
  const user = await findById(id);
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
