import { BookingService } from './book.service';
import { Booking } from 'src/Models/book.model';
import { CommonService } from 'src/utils/common/common.service';
import { GetCustomerParams } from 'src/dtos/get-customer-params.dto';
import { RmqContext } from '@nestjs/microservices';
export declare class BookingController {
    private readonly bookingService;
    private readonly commonService;
    constructor(bookingService: BookingService, commonService: CommonService);
    createFlight(id: number, context: RmqContext): Promise<Booking>;
    getUser(params: GetCustomerParams, id: string, context: RmqContext): Promise<string>;
    GetFlight(params: GetCustomerParams, id: number, context: RmqContext): Promise<Booking>;
    getFlightsByCustomer(id: number, context: RmqContext): Promise<Booking[]>;
}
