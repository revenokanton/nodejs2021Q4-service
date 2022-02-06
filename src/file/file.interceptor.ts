import { FileFastifyInterceptor } from 'fastify-file-interceptor';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { configService } from '../config/config.service';

export const UploadFileInterceptor = configService.getUseFastify()
  ? FileFastifyInterceptor('file', {
      storage: diskStorage({
        destination: configService.getFileStorageDirectory(),
        filename(_, file, cb) {
          cb(null, file.originalname);
        },
      }),
    })
  : FileInterceptor('file', {
      storage: diskStorage({
        destination: configService.getFileStorageDirectory(),
        filename(_, file, cb) {
          cb(null, file.originalname);
        },
      }),
    });
