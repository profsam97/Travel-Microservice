import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  await app.listen(8000);
}
bootstrap();
