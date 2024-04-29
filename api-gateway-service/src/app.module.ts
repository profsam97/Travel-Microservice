import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configs/config.module';
import { UtilsModule } from './utils/utils.module';
import { AuthGatewayModule } from './modules/auth-gateway.module';
import { AuthGuard } from './guards/auth-guard';
import { UserGatewayModule } from './modules/user-gateway.module';
import { FlightGatewayModule } from './modules/flight-gateway.module';
import { HotelGatewayModule } from './modules/hotel-gateway.module';

@Module({
  imports: [
    AuthGatewayModule,
    UtilsModule,
    UserGatewayModule,
    FlightGatewayModule,
    HotelGatewayModule,
    ConfigurationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
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
})
export class ApiGatewayModule {}
