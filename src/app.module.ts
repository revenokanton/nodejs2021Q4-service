import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [UserModule, BoardModule, ColumnModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
