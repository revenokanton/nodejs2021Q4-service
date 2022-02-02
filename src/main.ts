import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'verbose'],
    bodyParser: true,
    cors: true,
  });

  const appConfig = app.get<ConfigService>(ConfigService);
  const APP_PORT = appConfig.get('port') || 4000;

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(APP_PORT, () =>
    Logger.log(`Server started on port = ${APP_PORT}.`)
  );
}
bootstrap();
