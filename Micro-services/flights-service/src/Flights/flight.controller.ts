import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { FlightService } from './flight.service';
import { Flight } from '../Models/flight.model';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CommonService } from 'src/utils/common/common.service';
import { GetCustomerParams } from 'src/dtos/get-customer-params.dto';

@Controller('flight')
export class FlightController {
  constructor(
    private readonly FlightService: FlightService,
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'create-flight' })
  public async createFlight(
    @Payload('id') id: number,
    @Ctx() context: RmqContext,
  ): Promise<Flight> {
    this.commonService.acknowledgeMessage(context);
    const flight = await this.FlightService.createBooking(id);
    return flight;
  }
  @MessagePattern({ cmd: 'delete-flight' })
  public async DeleteFlight(
    @Payload() params: GetCustomerParams,
    @Payload('customerId') id: number,
    @Ctx() context: RmqContext,
  ): Promise<string> {
    this.commonService.acknowledgeMessage(context);
    if (!id || !params.id) {
      throw new HttpException(
        'Booking ID and Customer ID are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const deleted = await this.FlightService.deleteBooking(params.id, id);
    if (deleted) {
      return 'Booking deleted successfully';
    } else {
      throw new HttpException(
        'Booking not found or customer ID mismatch',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @MessagePattern({ cmd: 'get-flight' })
  public async GetFlight(
    @Payload() params: GetCustomerParams,
    @Payload('customerId') id: number,
    @Ctx() context: RmqContext,
  ): Promise<Flight> {
    this.commonService.acknowledgeMessage(context);
    if (!id || !params.id) {
      throw new HttpException(
        'Booking ID and Customer ID are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const booking = await this.FlightService.getBooking(params.id, id);
    return booking;
  }

  @MessagePattern({ cmd: 'fetch-flights' })
  public async getFlightsByCustomer(
    @Payload('id') id: number,
    @Ctx() context: RmqContext,
  ): Promise<Flight[]> {
    this.commonService.acknowledgeMessage(context);
    const flights: Flight[] = await this.FlightService.getFlightsByCustomer(id);
    return flights;
  }
}
