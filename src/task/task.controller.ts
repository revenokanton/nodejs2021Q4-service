import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('boards/:boardId')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('tasks')
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto
  ) {
    return this.taskService.create(createTaskDto);
  }

  @Get('tasks')
  findAll(@Param('boardId') boardId: string) {
    return this.taskService.findAll(boardId);
  }

  @Get('tasks/:taskId')
  findOne(@Param('boardId') boardId: string, @Param('taskId') taskId: string) {
    return this.taskService.findOne({ boardId, taskId });
  }

  @Post('tasks/:taskId')
  update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.update({ boardId, taskId }, updateTaskDto);
  }

  @Delete('tasks/:taskId')
  remove(@Param('boardId') boardId: string, @Param('taskId') taskId: string) {
    return this.taskService.remove({ boardId, taskId });
  }
}
