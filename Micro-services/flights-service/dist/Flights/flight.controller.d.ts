import { FlightService } from './flight.service';
import { Flight } from '../Models/flight.model';
import { RmqContext } from '@nestjs/microservices';
import { CommonService } from 'src/utils/common/common.service';
import { GetCustomerParams } from 'src/dtos/get-customer-params.dto';
export declare class FlightController {
    private readonly FlightService;
    private readonly commonService;
    constructor(FlightService: FlightService, commonService: CommonService);
    createFlight(id: number, context: RmqContext): Promise<Flight>;
    DeleteFlight(params: GetCustomerParams, id: number, context: RmqContext): Promise<string>;
    GetFlight(params: GetCustomerParams, id: number, context: RmqContext): Promise<Flight>;
    getFlightsByCustomer(id: number, context: RmqContext): Promise<Flight[]>;
}
