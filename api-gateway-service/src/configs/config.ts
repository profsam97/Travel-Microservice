import { IConfig } from './interfaces/IConfig';

export function config(): IConfig {
  return {
    rabbitmq_url: process.env.RABBITMQ_URL,
    authQueue: process.env.RABBITMQ_AUTH_QUEUE,
    userQueue: process.env.RABBITMQ_USER_QUEUE,
    hotelQueue: process.env.RABBITMQ_HOTEL_QUEUE,
    flightQueue: process.env.RABBITMQ_FLIGHT_QUEUE,
  };
}
