import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './entities/board.entity';
import { ColumnModule } from '../column/column.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), ColumnModule],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService, TypeOrmModule],
})
export class BoardModule {}
