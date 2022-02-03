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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundUserInterceptor } from './user.interceptor';
import { User } from './entities/user.entity';

@Controller('users')
@UseInterceptors(NotFoundUserInterceptor)
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
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (user) {
      return User.toResponse(user);
    }

    return null;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    if (updatedUser) {
      return User.toResponse(updatedUser);
    }

    return null;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedUser = await this.userService.remove(id);
    if (removedUser) {
      return User.toResponse(removedUser);
    }

    return null;
  }
}
