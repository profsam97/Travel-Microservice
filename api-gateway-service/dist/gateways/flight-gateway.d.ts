import { ClientProxy } from '@nestjs/microservices';
import { CommonService } from 'src/utils/common/common.service';
import { IFlight } from 'src/interfaces/flight.interface';
import { GetUserParams } from 'src/dtos/user';
export declare class FlightGateway {
    private readonly flightService;
    private readonly commonService;
    constructor(flightService: ClientProxy, commonService: CommonService);
    CreateFlight(id: number): Promise<IFlight>;
    DeleteFlight(params: GetUserParams, customerId: number): Promise<string>;
    GetFlight(params: GetUserParams, customerId: number): Promise<string>;
    GetFlights(id: number): Promise<IFlight>;
}
