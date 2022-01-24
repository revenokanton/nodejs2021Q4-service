import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

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
