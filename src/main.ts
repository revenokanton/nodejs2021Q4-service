import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'verbose'],
    bodyParser: true,
    cors: true,
  });

  const APP_PORT = configService.getPort() || 4000;

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(APP_PORT, () =>
    Logger.log(`Server started on port = ${APP_PORT}.`)
  );
}
bootstrap();
