import { IConfig } from './interfaces/config.interface';

export function config(): IConfig {
  return {
    rabbitmq_url: process.env.RABBITMQ_URL,
    authQueue: process.env.RABBITMQ_AUTH_QUEUE,
  };
}
