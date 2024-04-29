import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthGateway } from 'src/gateways/auth-gateway';

@Module({
  imports: [UtilsModule],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const URL = configService.get('rabbitmq_url');
        const queue = configService.get('authQueue');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${URL}`],
            queue,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [AuthGateway],
})
export class AuthGatewayModule {}
