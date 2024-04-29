import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from '../Models/flight.model';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
    UtilsModule,
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
