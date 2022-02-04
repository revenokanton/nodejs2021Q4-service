import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
} from 'typeorm';
import bcrypt from 'bcrypt';

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
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
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
