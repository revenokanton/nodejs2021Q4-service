import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyMultipart from 'fastify-multipart';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { LoggerOptions } from './logger/logger.options';

async function createApp() {
  const isFastify = configService.getUseFastify();

  if (isFastify) {
    const fastifyAdapter = new FastifyAdapter();
    fastifyAdapter.register(fastifyMultipart);

    return NestFactory.create<NestFastifyApplication>(
      AppModule,
      fastifyAdapter,
      {
        logger: WinstonModule.createLogger(LoggerOptions),
        bodyParser: true,
        cors: true,
      }
    );
  }

  return NestFactory.create<INestApplication>(AppModule, {
    logger: WinstonModule.createLogger(LoggerOptions),
    bodyParser: true,
    cors: true,
  });
}

async function bootstrap() {
  const app = await createApp();

  const APP_PORT = configService.getPort() || 4000;

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
  );

  await app.listen(APP_PORT, () =>
    Logger.log(`Server started on port ${APP_PORT}`)
  );
}

bootstrap();
