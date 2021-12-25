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
};

const port = 'PORT';
const nodeEnv = 'NODE_ENV';
const mongoConnection = 'MONGO_CONNECTION_STRING';
const jwtSecretKey = 'JWT_SECRET_KEY';
const authMode = 'AUTH_MODE';
const logPath = 'LOG_PATH';
const logLevel = 'LOG_LEVEL';

export const config: ConfigType = {
  PORT: process.env[port] || 4000,
  NODE_ENV: process.env[nodeEnv],
  MONGO_CONNECTION_STRING: process.env[mongoConnection],
  JWT_SECRET_KEY: process.env[jwtSecretKey],
  AUTH_MODE: process.env[authMode] === 'true',
  LOG_PATH: process.env[logPath] || './log',
  LOG_LEVEL: process.env[logLevel] || 'trace',
};
