import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BoardColumn } from '../column/column.model';
import { Task } from '../task/task.model';

export interface BoardInterface {
  id: string;
  title: string;
  columns: BoardColumn[];
}

/**
 * @class Board which implements BoardInterface
 * @property id - The board's id
 * @property title - The board's title
 * @property columns - The board's columns
 */
@Entity()
export class Board {
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
