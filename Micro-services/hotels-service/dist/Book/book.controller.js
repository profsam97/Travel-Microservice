"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const common_service_1 = require("../utils/common/common.service");
const get_customer_params_dto_1 = require("../dtos/get-customer-params.dto");
const microservices_1 = require("@nestjs/microservices");
let BookingController = class BookingController {
    constructor(bookingService, commonService) {
        this.bookingService = bookingService;
        this.commonService = commonService;
    }
    async createFlight(id, context) {
        this.commonService.acknowledgeMessage(context);
        const booking = await this.bookingService.createBooking(id);
        return booking;
    }
    async getUser(params, id, context) {
        this.commonService.acknowledgeMessage(context);
        if (!id || !params.id) {
            throw new common_1.HttpException('Booking ID and Customer ID are required', common_1.HttpStatus.BAD_REQUEST);
        }
        const deleted = await this.bookingService.deleteBooking(params.id, id);
        if (deleted) {
            return 'Booking deleted successfully';
        }
        else {
            throw new common_1.HttpException('Booking not found or customer ID mismatch', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async GetFlight(params, id, context) {
        this.commonService.acknowledgeMessage(context);
        if (!id || !params.id) {
            throw new common_1.HttpException('Booking ID and Customer ID are required', common_1.HttpStatus.BAD_REQUEST);
        }
        const booking = await this.bookingService.getBooking(params.id, id);
        return booking;
    }
    async getFlightsByCustomer(id, context) {
        this.commonService.acknowledgeMessage(context);
        const flights = await this.bookingService.getBookingsByCustomer(id);
        return flights;
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create-booking' }),
    __param(0, (0, microservices_1.Payload)('id')),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "createFlight", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete-booking' }),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Payload)('customerId')),
    __param(2, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_customer_params_dto_1.GetCustomerParams, String, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-booking' }),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Payload)('customerId')),
    __param(2, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_customer_params_dto_1.GetCustomerParams, Number, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "GetFlight", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'fetch-bookings' }),
    __param(0, (0, microservices_1.Payload)('id')),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getFlightsByCustomer", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)('bookings'),
    __metadata("design:paramtypes", [book_service_1.BookingService,
        common_service_1.CommonService])
], BookingController);
//# sourceMappingURL=book.controller.js.map