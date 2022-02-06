import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly repo: Repository<Board>
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  create(createBoardDto: CreateBoardDto) {
    return this.repo.save(createBoardDto);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const existingBoard = await this.repo.findOne(id);
    if (existingBoard) {
      const boardToUpdate = { ...existingBoard, ...updateBoardDto };
      return this.repo.save(boardToUpdate);
    }

    return null;
  }

  async remove(id: string) {
    const boardToDelete = await this.repo.findOne(id);
    if (boardToDelete) {
      return this.repo.remove(boardToDelete);
    }

    return null;
  }
}
