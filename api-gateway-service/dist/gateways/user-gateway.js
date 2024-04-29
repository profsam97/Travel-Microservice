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
exports.UserGateway = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../decorators");
const microservices_1 = require("@nestjs/microservices");
const user_1 = require("../dtos/user");
const common_service_1 = require("../utils/common/common.service");
const pagination_dto_1 = require("../dtos/pagination.dto");
let UserGateway = class UserGateway {
    constructor(userService, commonService) {
        this.userService = userService;
        this.commonService = commonService;
    }
    async GetMe(id) {
        return await this.commonService.sendEvent(this.userService, { cmd: 'get-me' }, { id });
    }
    async GetAllUsers(params) {
        return await this.commonService.sendEvent(this.userService, { cmd: 'get-all-users' }, { ...params });
    }
    async GetUser(params) {
        return await this.commonService.sendEvent(this.userService, { cmd: 'get-single-user' }, { ...params });
    }
    async UpdateUser(id, dto) {
        const updateOptions = dto;
        return await this.commonService.sendEvent(this.userService, { cmd: 'update-user' }, { id, updateOptions });
    }
    async DeleteUser(id, dto) {
        const deleteOptions = dto;
        console.log(id);
        return await this.commonService.sendEvent(this.userService, { cmd: 'delete-user' }, { id, deleteOptions });
    }
};
exports.UserGateway = UserGateway;
__decorate([
    (0, common_1.Get)('/me'),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "GetMe", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "GetAllUsers", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.GetUserParams]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "GetUser", null);
__decorate([
    (0, common_1.Patch)('/'),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "UpdateUser", null);
__decorate([
    (0, common_1.Delete)('/'),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_1.DeleteUserDto]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "DeleteUser", null);
exports.UserGateway = UserGateway = __decorate([
    (0, common_1.Controller)('api/v1/user'),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        common_service_1.CommonService])
], UserGateway);
//# sourceMappingURL=user-gateway.js.map