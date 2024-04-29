import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { UtilsModule } from 'src/utils/utils.module';
import { HotelGateway } from 'src/gateways/hotel-gateway';

@Module({
  imports: [UtilsModule],
  providers: [
    {
      provide: 'HOTEL_SERVICE',
      useFactory: (configService: ConfigService) => {
        const URL = configService.get('rabbitmq_url');
        const queue = configService.get('hotelQueue');

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
  controllers: [HotelGateway],
})
export class HotelGatewayModule {}
