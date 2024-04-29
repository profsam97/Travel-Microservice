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
exports.FlightController = void 0;
const common_1 = require("@nestjs/common");
const flight_service_1 = require("./flight.service");
const microservices_1 = require("@nestjs/microservices");
const common_service_1 = require("../utils/common/common.service");
const get_customer_params_dto_1 = require("../dtos/get-customer-params.dto");
let FlightController = class FlightController {
    constructor(FlightService, commonService) {
        this.FlightService = FlightService;
        this.commonService = commonService;
    }
    async createFlight(id, context) {
        this.commonService.acknowledgeMessage(context);
        const flight = await this.FlightService.createBooking(id);
        return flight;
    }
    async DeleteFlight(params, id, context) {
        this.commonService.acknowledgeMessage(context);
        if (!id || !params.id) {
            throw new common_1.HttpException('Booking ID and Customer ID are required', common_1.HttpStatus.BAD_REQUEST);
        }
        const deleted = await this.FlightService.deleteBooking(params.id, id);
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
        const booking = await this.FlightService.getBooking(params.id, id);
        return booking;
    }
    async getFlightsByCustomer(id, context) {
        this.commonService.acknowledgeMessage(context);
        const flights = await this.FlightService.getFlightsByCustomer(id);
        return flights;
    }
};
exports.FlightController = FlightController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create-flight' }),
    __param(0, (0, microservices_1.Payload)('id')),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], FlightController.prototype, "createFlight", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete-flight' }),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Payload)('customerId')),
    __param(2, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_customer_params_dto_1.GetCustomerParams, Number, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], FlightController.prototype, "DeleteFlight", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-flight' }),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Payload)('customerId')),
    __param(2, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_customer_params_dto_1.GetCustomerParams, Number, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], FlightController.prototype, "GetFlight", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'fetch-flights' }),
    __param(0, (0, microservices_1.Payload)('id')),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], FlightController.prototype, "getFlightsByCustomer", null);
exports.FlightController = FlightController = __decorate([
    (0, common_1.Controller)('flight'),
    __metadata("design:paramtypes", [flight_service_1.FlightService,
        common_service_1.CommonService])
], FlightController);
//# sourceMappingURL=flight.controller.js.map