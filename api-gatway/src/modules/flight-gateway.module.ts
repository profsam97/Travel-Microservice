import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { UtilsModule } from 'src/utils/utils.module';
import { FlightGateway } from 'src/gateways/flight-gateway';

@Module({
  imports: [UtilsModule],
  providers: [
    {
      provide: 'FLIGHT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const URL = configService.get('rabbitmq_url');
        const queue = configService.get('flightQueue');

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
  controllers: [FlightGateway],
})
export class FlightGatewayModule {}
