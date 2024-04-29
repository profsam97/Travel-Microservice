import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { BookingService } from './book.service';
import { Booking } from 'src/Models/book.model';
import { CommonService } from 'src/utils/common/common.service';
import { GetCustomerParams } from 'src/dtos/get-customer-params.dto';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('bookings')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,

    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'create-booking' })
  public async createFlight(
    @Payload('id') id: number,
    @Ctx() context: RmqContext,
  ): Promise<Booking> {
    this.commonService.acknowledgeMessage(context);
    const booking = await this.bookingService.createBooking(id);
    return booking;
  }

  @MessagePattern({ cmd: 'delete-booking' })
  public async getUser(
    @Payload() params: GetCustomerParams,
    @Payload('customerId') id: string,
    @Ctx() context: RmqContext,
  ): Promise<string> {
    this.commonService.acknowledgeMessage(context);
    if (!id || !params.id) {
      throw new HttpException(
        'Booking ID and Customer ID are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const deleted = await this.bookingService.deleteBooking(params.id, id);
    if (deleted) {
      return 'Booking deleted successfully';
    } else {
      throw new HttpException(
        'Booking not found or customer ID mismatch',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @MessagePattern({ cmd: 'get-booking' })
  public async GetFlight(
    @Payload() params: GetCustomerParams,
    @Payload('customerId') id: number,
    @Ctx() context: RmqContext,
  ): Promise<Booking> {
    this.commonService.acknowledgeMessage(context);
    if (!id || !params.id) {
      throw new HttpException(
        'Booking ID and Customer ID are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const booking = await this.bookingService.getBooking(params.id, id);
    return booking;
  }
  @MessagePattern({ cmd: 'fetch-bookings' })
  public async getFlightsByCustomer(
    @Payload('id') id: number,
    @Ctx() context: RmqContext,
  ): Promise<Booking[]> {
    this.commonService.acknowledgeMessage(context);
    const flights: Booking[] =
      await this.bookingService.getBookingsByCustomer(id);
    return flights;
  }
}
