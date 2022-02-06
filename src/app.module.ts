import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';
import { TaskModule } from './task/task.module';
import { LoginModule } from './login/login.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    BoardModule,
    ColumnModule,
    TaskModule,
    LoginModule,
    FileModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
