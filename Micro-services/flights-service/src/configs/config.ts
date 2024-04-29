import { IConfig } from './interfaces/config.interface';

export function config(): IConfig {
  return {
    rabbitmq_url: process.env.RABBITMQ_URL,
    flightQueue: process.env.RABBITMQ_FLIGHT_QUEUE,
  };
}
