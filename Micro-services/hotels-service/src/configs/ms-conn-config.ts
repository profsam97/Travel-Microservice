import { Transport } from '@nestjs/microservices';

export const microserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [`amqp://${process.env.RABBITMQ_URL}`],
    queue: `${process.env.RABBITMQ_HOTEL_QUEUE}`,
    noAck: false,
    queueOptions: {
      durable: true,
    },
  },
};
