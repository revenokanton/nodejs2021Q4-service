import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Board } from '../../board/entities/board.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class BoardColumn extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  board: Board;

  @ManyToOne(() => Task, (task) => task.columnId, {
    onDelete: 'CASCADE',
  })
  tasks: Task[];
}
