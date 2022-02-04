import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  Put,
  HttpCode,
  Header,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { NotFoundInterceptor } from '../interceptors/not_found.interceptor';

@Controller('boards')
@UseInterceptors(new NotFoundInterceptor('No board with given id.'))
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @HttpCode(201)
  @Header('Content-Type', 'application/json; charset=utf-8')
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  @Header('Content-Type', 'application/json; charset=utf-8')
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json; charset=utf-8')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.boardService.findOne(id);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json; charset=utf-8')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBoardDto: UpdateBoardDto
  ) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json; charset=utf-8')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.boardService.remove(id);
  }
}
