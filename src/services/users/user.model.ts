import { v4 as uuidv4 } from 'uuid';

export interface UserInterface {
  name: string;
  id: string;
  login: string;
  password: string;
}

/**
 * @class User which implements UserInterface
 * @property id - The user's id
 * @property name - The user's name
 * @property login - The user's login
 * @property password - The user's password
 */
export class User implements UserInterface {
  name: string;

  id: string;

  login: string;

  password: string;

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: UserInterface) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Returns user data without password
   * @param user - user item from which password should be deleted
   * @returns user item without password value
   */
  static toResponse(user: UserInterface): Omit<UserInterface, 'password'> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
