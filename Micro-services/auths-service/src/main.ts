import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { microserviceOptions } from './configs/ms-connection.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice(microserviceOptions);
  app.startAllMicroservices();
  await app.listen(6000);
}
bootstrap();
