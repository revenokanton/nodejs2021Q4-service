import { Injectable, Header } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) {}

  @Header('Content-Type', 'application/json; charset=utf-8')
  findAll() {
    return this.repo.find();
  }

  @Header('Content-Type', 'application/json; charset=utf-8')
  findOne(id: string) {
    return this.repo.findOne(id);
  }

  @Header('Content-Type', 'application/json; charset=utf-8')
  create(createUserDto: CreateUserDto) {
    return this.repo.save(createUserDto);
  }

  @Header('Content-Type', 'application/json; charset=utf-8')
  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.repo.findOne(id);

    if (existingUser) {
      const userToUpdate = { ...existingUser, ...updateUserDto };
      return this.repo.save(userToUpdate);
    }

    return null;
  }

  @Header('Content-Type', 'application/json; charset=utf-8')
  async remove(id: string) {
    const userToDelete = await this.repo.findOne(id);

    if (userToDelete) {
      return this.repo.remove(userToDelete);
    }

    return null;
  }
}
