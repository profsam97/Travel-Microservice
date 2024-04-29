import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './Flights/flight.module';
import { DatabaseModule } from './Module/database.module';
import { ConfigurationModule } from './configs/config.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [DatabaseModule, ConfigurationModule, UtilsModule, FlightModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
