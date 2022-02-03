import { Injectable } from '@nestjs/common';
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

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  create(createUserDto: CreateUserDto) {
    return this.repo.save(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.repo.findOne(id);

    if (existingUser) {
      const userToUpdate = { ...existingUser, ...updateUserDto };
      return this.repo.save(userToUpdate);
    }

    return null;
  }

  async remove(id: string) {
    const userToDelete = await this.repo.findOne(id);

    if (userToDelete) {
      return this.repo.remove(userToDelete);
    }

    return null;
  }
}
