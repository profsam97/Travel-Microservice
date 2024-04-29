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
exports.HotelGateway = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_service_1 = require("../utils/common/common.service");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const user_1 = require("../dtos/user");
let HotelGateway = class HotelGateway {
    constructor(hotelService, commonService) {
        this.hotelService = hotelService;
        this.commonService = commonService;
    }
    async CreateBooking(id) {
        return await this.commonService.sendEvent(this.hotelService, { cmd: 'create-booking' }, { id });
    }
    async DeleteBooking(params, customerId) {
        return await this.commonService.sendEvent(this.hotelService, { cmd: 'delete-booking' }, { ...params, customerId });
    }
    async GetBooking(params, customerId) {
        return await this.commonService.sendEvent(this.hotelService, { cmd: 'get-booking' }, { ...params, customerId });
    }
    async GetBookings(id) {
        return await this.commonService.sendEvent(this.hotelService, { cmd: 'fetch-bookings' }, { id });
    }
};
exports.HotelGateway = HotelGateway;
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HotelGateway.prototype, "CreateBooking", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.GetUserParams, Number]),
    __metadata("design:returntype", Promise)
], HotelGateway.prototype, "DeleteBooking", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.GetUserParams, Number]),
    __metadata("design:returntype", Promise)
], HotelGateway.prototype, "GetBooking", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HotelGateway.prototype, "GetBookings", null);
exports.HotelGateway = HotelGateway = __decorate([
    (0, common_1.Controller)('api/v1/hotel'),
    __param(0, (0, common_1.Inject)('HOTEL_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        common_service_1.CommonService])
], HotelGateway);
//# sourceMappingURL=hotel-gateway.js.map