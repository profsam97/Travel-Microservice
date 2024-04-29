import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { microserviceOptions } from './configs/ms-conn-config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(microserviceOptions);
  app.startAllMicroservices();

  await app.listen(8005);
  Logger.log('Microservice is listening');
}

bootstrap();
