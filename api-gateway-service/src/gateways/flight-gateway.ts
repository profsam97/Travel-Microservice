import { Controller, Inject, Post, Delete, Param, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommonService } from 'src/utils/common/common.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { IFlight } from 'src/interfaces/flight.interface';
import { GetUserParams } from 'src/dtos/user';

@Controller('api/v1/flight')
export class FlightGateway {
  constructor(
    @Inject('FLIGHT_SERVICE') private readonly flightService: ClientProxy,
    private readonly commonService: CommonService,
  ) {}

  @Post('/')
  public async CreateFlight(@CurrentUser() id: number): Promise<IFlight> {
    return await this.commonService.sendEvent(
      this.flightService,
      { cmd: 'create-flight' },
      { id },
    );
  }

  @Delete('/:id')
  public async DeleteFlight(
    @Param() params: GetUserParams,
    @CurrentUser() customerId: number,
  ): Promise<string> {
    return await this.commonService.sendEvent(
      this.flightService,
      { cmd: 'delete-flight' },
      { ...params, customerId },
    );
  }
  @Get('/:id')
  public async GetFlight(
    @Param() params: GetUserParams,
    @CurrentUser() customerId: number,
  ): Promise<string> {
    return await this.commonService.sendEvent(
      this.flightService,
      { cmd: 'get-flight' },
      { ...params, customerId },
    );
  }
  @Get('/')
  public async GetFlights(@CurrentUser() id: number): Promise<IFlight> {
    return await this.commonService.sendEvent(
      this.flightService,
      { cmd: 'fetch-flights' },
      { id },
    );
  }
}
