import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from '../Models/book.model';
import { BookingService } from './book.service';
import { BookingController } from './book.controller';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    UtilsModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
