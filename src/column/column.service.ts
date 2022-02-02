import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnService {
  create(createColumnDto: CreateColumnDto) {
    return 'This action adds a new column';
  }

  findAll() {
    return `This action returns all column`;
  }

  findOne(id: string) {
    return `This action returns a #${id} column`;
  }

  update(id: string, updateColumnDto: UpdateColumnDto) {
    return `This action updates a #${id} column`;
  }

  remove(id: string) {
    return `This action removes a #${id} column`;
  }
}
