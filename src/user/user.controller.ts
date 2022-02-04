import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { NotFoundInterceptor } from '../interceptors/not_found.interceptor';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
@UseInterceptors(new NotFoundInterceptor('No user with given id.'))
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.create(createUserDto);
    return User.toResponse(createdUser);
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => User.toResponse(user));
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOne(id);
    if (user) {
      return User.toResponse(user);
    }

    return null;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    if (updatedUser) {
      return User.toResponse(updatedUser);
    }

    return null;
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const removedUser = await this.userService.remove(id);
    if (removedUser) {
      return User.toResponse(removedUser);
    }

    return null;
  }
}
