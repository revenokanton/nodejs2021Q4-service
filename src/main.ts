import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { LoggerOptions } from './logger/logger.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(LoggerOptions),
    bodyParser: true,
    cors: true,
  });

  const APP_PORT = configService.getPort() || 4000;

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
  );

  await app.listen(APP_PORT, () =>
    Logger.log(`Server started on port ${APP_PORT}`)
  );
}
bootstrap();
