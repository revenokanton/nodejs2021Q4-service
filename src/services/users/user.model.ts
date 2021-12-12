import { v4 as uuidv4 } from 'uuid';

export interface UserInterface {
  name: string;
  id: string;
  login: string;
  password: string;
}

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

  static toResponse(user: UserInterface): Omit<UserInterface, 'password'> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
