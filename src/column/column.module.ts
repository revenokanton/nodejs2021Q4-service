import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumn } from './entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardColumn])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class ColumnModule {}
