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
exports.FlightGateway = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_service_1 = require("../utils/common/common.service");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const user_1 = require("../dtos/user");
let FlightGateway = class FlightGateway {
    constructor(flightService, commonService) {
        this.flightService = flightService;
        this.commonService = commonService;
    }
    async CreateFlight(id) {
        return await this.commonService.sendEvent(this.flightService, { cmd: 'create-flight' }, { id });
    }
    async DeleteFlight(params, customerId) {
        return await this.commonService.sendEvent(this.flightService, { cmd: 'delete-flight' }, { ...params, customerId });
    }
    async GetFlight(params, customerId) {
        return await this.commonService.sendEvent(this.flightService, { cmd: 'get-flight' }, { ...params, customerId });
    }
    async GetFlights(id) {
        return await this.commonService.sendEvent(this.flightService, { cmd: 'fetch-flights' }, { id });
    }
};
exports.FlightGateway = FlightGateway;
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FlightGateway.prototype, "CreateFlight", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.GetUserParams, Number]),
    __metadata("design:returntype", Promise)
], FlightGateway.prototype, "DeleteFlight", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.GetUserParams, Number]),
    __metadata("design:returntype", Promise)
], FlightGateway.prototype, "GetFlight", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FlightGateway.prototype, "GetFlights", null);
exports.FlightGateway = FlightGateway = __decorate([
    (0, common_1.Controller)('api/v1/flight'),
    __param(0, (0, common_1.Inject)('FLIGHT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        common_service_1.CommonService])
], FlightGateway);
//# sourceMappingURL=flight-gateway.js.map