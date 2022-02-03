import { ConnectionOptions } from 'typeorm';
import { config } from '../common/config';

export default {
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT as number,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: false,
  logging: true,
  cache: false,
  migrationsRun: true,
  entities: [
    'src/services/users/user.model.ts',
    'src/services/board/board.model.ts',
    'src/services/task/task.model.ts',
    'src/services/column/column.model.ts',
  ],
  migrations: ['src/db/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
} as ConnectionOptions;
