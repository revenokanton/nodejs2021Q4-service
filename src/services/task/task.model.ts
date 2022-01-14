import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.model';

export interface TaskInterface {
  id: string;
  title: string;
  description: string;
  order: number;
  userId?: string | null;
  boardId?: string | null;
  columnId?: string | null;
}

/**
 * @class Task which implements TaskInterface
 * @property id - The task's id
 * @property title - The task's title
 * @property description - The task's description
 * @property order - The task's order
 * @property userId - The user id to which the task is attached
 * @property boardId - The board id to which the task is attached
 * @property columnId - The column id to which the task is attached
 */
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  order: number;

  @ManyToOne(() => User, {
    deferrable: 'INITIALLY DEFERRED',
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;

  @Column({ type: 'varchar', nullable: true, default: null })
  userId: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  boardId: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  columnId: string | null;
}
