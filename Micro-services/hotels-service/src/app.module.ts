import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './Modules/database.module';
import { BookingModule } from './Book/book.module';
import { ConfigurationModule } from './configs/config.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [DatabaseModule, BookingModule, ConfigurationModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
