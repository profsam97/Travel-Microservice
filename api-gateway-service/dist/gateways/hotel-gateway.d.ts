import { ClientProxy } from '@nestjs/microservices';
import { CommonService } from 'src/utils/common/common.service';
import { IFlight } from 'src/interfaces/flight.interface';
import { GetUserParams } from 'src/dtos/user';
export declare class HotelGateway {
    private readonly hotelService;
    private readonly commonService;
    constructor(hotelService: ClientProxy, commonService: CommonService);
    CreateBooking(id: number): Promise<IFlight>;
    DeleteBooking(params: GetUserParams, customerId: number): Promise<string>;
    GetBooking(params: GetUserParams, customerId: number): Promise<string>;
    GetBookings(id: number): Promise<IFlight>;
}
