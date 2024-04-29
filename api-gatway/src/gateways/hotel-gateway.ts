import { Controller, Inject, Post, Delete, Param, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommonService } from 'src/utils/common/common.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { IFlight } from 'src/interfaces/flight.interface';
import { GetUserParams } from 'src/dtos/user';

@Controller('api/v1/hotel')
export class HotelGateway {
  constructor(
    @Inject('HOTEL_SERVICE') private readonly hotelService: ClientProxy,
    private readonly commonService: CommonService,
  ) {}

  @Post('/')
  public async CreateBooking(@CurrentUser() id: number): Promise<IFlight> {
    return await this.commonService.sendEvent(
      this.hotelService,
      { cmd: 'create-booking' },
      { id },
    );
  }

  @Delete('/:id')
  public async DeleteBooking(
    @Param() params: GetUserParams,
    @CurrentUser() customerId: number,
  ): Promise<string> {
    return await this.commonService.sendEvent(
      this.hotelService,
      { cmd: 'delete-booking' },
      { ...params, customerId },
    );
  }
  @Get('/:id')
  public async GetBooking(
    @Param() params: GetUserParams,
    @CurrentUser() customerId: number,
  ): Promise<string> {
    return await this.commonService.sendEvent(
      this.hotelService,
      { cmd: 'get-booking' },
      { ...params, customerId },
    );
  }
  @Get('/')
  public async GetBookings(@CurrentUser() id: number): Promise<IFlight> {
    return await this.commonService.sendEvent(
      this.hotelService,
      { cmd: 'fetch-bookings' },
      { id },
    );
  }
}
