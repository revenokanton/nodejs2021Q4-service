import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { BoardModule } from '../board/board.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), BoardModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TypeOrmModule],
})
export class TaskModule {}
