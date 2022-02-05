import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs';
import { configService } from '../config/config.service';
import { UploadFileInterceptor } from './file.interceptor';

@Controller('file')
export class FileController {
  @Post()
  @UseInterceptors(UploadFileInterceptor)
  async upload(@UploadedFile() file: Express.Multer.File) {
    return {
      fileName: file.filename,
    };
  }

  @Get(':file')
  get(@Param('file') fileName: string): StreamableFile {
    const filePath = join(configService.getFileStorageDirectory(), fileName);
    const isValidFile = fs.existsSync(filePath);

    if (!isValidFile) {
      throw new InternalServerErrorException(
        `Not found such file with name ${fileName}.`
      );
    }

    const fileStream = createReadStream(filePath);

    return new StreamableFile(fileStream);
  }
}
