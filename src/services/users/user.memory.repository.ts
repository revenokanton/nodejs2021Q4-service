import { getManager, getRepository } from 'typeorm';

import { User, UserInterface } from './user.model';

/**
 * Returns all users from temporary db
 * @returns Promise to users array from temporary db
 */
const findAll = async (): Promise<UserInterface[]> => getManager().find(User);

/**
 * Returns user with provided id from temporary db
 * @param id - id of the user
 * @returns Promise to user according to the transmitted id or undefined if no such user found
 */
const findById = async (id: string): Promise<UserInterface | undefined> =>
  getRepository(User).findOne(id);

/**
 * Add new user to the users temporary db
 * @param user - object with user fields
 * @returns Promise void is returned
 */
const addNewUser = async (user: UserInterface): Promise<User> =>
  getRepository(User).save(user);

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
  const existingUser = await getRepository(User).findOne(id);
  if (existingUser) {
    const userToUpdate = { ...existingUser, ...data };
    return getRepository(User).save(userToUpdate);
  }
  return null;
};

/**
 * Delete user with provided id from temporary db
 * @param id - id of the user
 * @returns Promise to user which was deleted or null if no such user found
 */
const deleteUser = async (id: string): Promise<UserInterface | null> => {
  const userToDelete = await getRepository(User).findOne(id);
  if (userToDelete) {
    return getRepository(User).remove(userToDelete);
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
