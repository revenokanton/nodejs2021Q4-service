import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getLogLevel() {
    return this.getValue('LOG_LEVEL', false);
  }

  public getSecret() {
    return this.getValue('JWT_SECRET_KEY', true);
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT'), 10),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_NAME'),

      synchronize: false,
      logging: true,
      cache: false,

      entities: ['dist/**/*.entity.js'],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'NODE_ENV',
  'PORT',
  'CONTAINER_PORT',
  'AUTH_MODE',
  'JWT_SECRET_KEY',
  'LOG_LEVEL',
  'DB_PORT',
  'DB_HOST',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
]);

export { configService };
