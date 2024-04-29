import { IConfig } from './interfaces/config.interface';

export function config(): IConfig {
  return {
    rabbitmq_url: process.env.RABBITMQ_URL,
    hotelQueue: process.env.RABBITMQ_HOTEL_QUEUE,
  };
}
