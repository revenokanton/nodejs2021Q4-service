import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { BoardColumn } from '../../column/entities/column.entity';
import { Task } from '../../task/entities/task.entity';

/**
 * @class Board which implements BoardInterface
 * @property id - The board's id
 * @property title - The board's title
 * @property columns - The board's columns
 */
@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => BoardColumn, (column) => column.board, {
    eager: true,
    cascade: true,
  })
  columns: BoardColumn[];

  @OneToMany(() => Task, (task) => task.boardId, {
    cascade: true,
  })
  tasks: Task[];
}
