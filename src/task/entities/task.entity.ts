import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Board } from '../../board/entities/board.entity';
import { BoardColumn } from '../../column/entities/column.entity';

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

  @ManyToOne(() => Board, {
    deferrable: 'INITIALLY DEFERRED',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'boardId',
    referencedColumnName: 'id',
  })
  @Column({ type: 'varchar', nullable: true, default: null })
  boardId: string | null;

  @ManyToOne(() => BoardColumn, {
    deferrable: 'INITIALLY DEFERRED',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'columnId',
    referencedColumnName: 'id',
  })
  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  columnId: string | null;
}
