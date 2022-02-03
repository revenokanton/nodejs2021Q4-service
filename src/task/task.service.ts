import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

type TaskIdParams = { boardId: string; taskId: string };

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly repo: Repository<Task>
  ) {}

  findAll(boardId: string) {
    return this.repo.find({ boardId });
  }

  findOne({ boardId, taskId }: TaskIdParams) {
    return this.repo.findOne({ id: taskId, boardId });
  }

  create(createTaskDto: CreateTaskDto) {
    return this.repo.save(
      JSON.parse(JSON.stringify(createTaskDto), (_key, value) =>
        value === null || value === '' ? undefined : value
      )
    );
  }

  async update(
    { boardId, taskId }: TaskIdParams,
    updateTaskDto: UpdateTaskDto
  ) {
    const existingTask = await this.repo.findOne({
      id: taskId,
      boardId,
    });

    const parsedData = JSON.parse(
      JSON.stringify(updateTaskDto),
      (_key, value) => (value === null || value === '' ? undefined : value)
    );

    if (existingTask) {
      const taskToUpdate = { ...existingTask, ...parsedData };
      return this.repo.save(taskToUpdate);
    }

    return null;
  }

  async remove({ boardId, taskId }: TaskIdParams) {
    const taskToDelete = await this.repo.findOne({
      id: taskId,
      boardId,
    });

    if (taskToDelete) {
      return this.repo.remove(taskToDelete);
    }

    return null;
  }
}
