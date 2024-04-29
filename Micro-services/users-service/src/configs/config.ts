import { IConfig } from './interfaces/config.interface';

export function config(): IConfig {
  return {
    rabbitmq_url: process.env.RABBITMQ_URL,
    userQueue: process.env.RABBITMQ_USER_QUEUE,
  };
}
