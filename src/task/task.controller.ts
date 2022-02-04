import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  Header,
  UseInterceptors,
  NotFoundException,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { BoardService } from '../board/board.service';
import { NotFoundInterceptor } from '../interceptors/not_found.interceptor';
import { AuthGuard } from '../auth/auth.guard';

@Controller('boards/:boardId')
@UseInterceptors(new NotFoundInterceptor('No task with given id.'))
@UseGuards(AuthGuard)
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private boardService: BoardService
  ) {}

  @Post('tasks')
  @HttpCode(201)
  @Header('Content-Type', 'application/json; charset=utf-8')
  async create(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Body() createTaskDto: CreateTaskDto
  ) {
    const board = await this.boardService.findOne(boardId);
    if (board) {
      return this.taskService.create({ ...createTaskDto, boardId });
    }

    return null;
  }

  @Get('tasks')
  @Header('Content-Type', 'application/json; charset=utf-8')
  findAll(@Param('boardId', new ParseUUIDPipe()) boardId: string) {
    return this.taskService.findAll(boardId);
  }

  @Get('tasks/:taskId')
  @Header('Content-Type', 'application/json; charset=utf-8')
  async findOne(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string
  ) {
    const board = await this.boardService.findOne(boardId);
    if (board) {
      return this.taskService.findOne({ boardId, taskId });
    }

    throw new NotFoundException('No tasks with given boardId.');
  }

  @Put('tasks/:taskId')
  @Header('Content-Type', 'application/json; charset=utf-8')
  async update(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.update({ boardId, taskId }, updateTaskDto);
  }

  @Delete('tasks/:taskId')
  @Header('Content-Type', 'application/json; charset=utf-8')
  remove(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('taskId') taskId: string
  ) {
    return this.taskService.remove({ boardId, taskId });
  }
}
