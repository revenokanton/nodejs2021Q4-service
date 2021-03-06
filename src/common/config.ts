import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join('./.env'),
});

export type ConfigType = {
  PORT: string | number;
  NODE_ENV?: string;
  MONGO_CONNECTION_STRING?: string;
  JWT_SECRET_KEY?: string;
  AUTH_MODE?: boolean;
  LOG_PATH?: string;
  LOG_LEVEL?: string;
  DB_PORT: string | number;
  DB_NAME?: string;
  DB_PASSWORD?: string;
  DB_USER?: string;
  DB_HOST?: string;
  JWT_SECRET?: string;
};

const port = 'PORT';
const nodeEnv = 'NODE_ENV';
const mongoConnection = 'MONGO_CONNECTION_STRING';
const jwtSecretKey = 'JWT_SECRET_KEY';
const authMode = 'AUTH_MODE';
const logPath = 'LOG_PATH';
const logLevel = 'LOG_LEVEL';
const dbPort = 'DB_PORT';
const dbName = 'DB_NAME';
const dbPassword = 'DB_PASSWORD';
const dbUser = 'DB_USER';
const dbHost = 'DB_HOST';

export const config: ConfigType = {
  PORT: process.env[port] || 4000,
  NODE_ENV: process.env[nodeEnv],
  MONGO_CONNECTION_STRING: process.env[mongoConnection],
  JWT_SECRET_KEY: process.env[jwtSecretKey],
  AUTH_MODE: process.env[authMode] === 'true',
  LOG_PATH: process.env[logPath] || './logs',
  LOG_LEVEL: process.env[logLevel] || 'trace',
  DB_HOST: process.env[dbHost] || 'localhost',
  DB_PORT: process.env[dbPort] || 5432,
  DB_NAME: process.env[dbName],
  DB_PASSWORD: process.env[dbPassword],
  DB_USER: process.env[dbUser],
};
