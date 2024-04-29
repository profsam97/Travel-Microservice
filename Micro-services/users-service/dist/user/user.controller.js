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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("../dtos/update-user.dto");
const delete_user_dto_1 = require("../dtos/delete-user.dto");
const common_service_1 = require("../utils/common/common.service");
const microservices_1 = require("@nestjs/microservices");
const pagination_dto_1 = require("../dtos/pagination.dto");
const get_user_params_dto_1 = require("../dtos/get-user-params.dto");
let UserController = class UserController {
    constructor(userService, commonService) {
        this.userService = userService;
        this.commonService = commonService;
    }
    async getMe(id, context) {
        this.commonService.acknowledgeMessage(context);
        const user = await this.userService.getCurrentUser(id);
        return user;
    }
    async fetchUsers(params, context) {
        this.commonService.acknowledgeMessage(context);
        const { page, perPage } = params;
        const users = await this.userService.findAllUsers(page, perPage);
        return users;
    }
    async getUser(params, context) {
        this.commonService.acknowledgeMessage(context);
        const user = await this.userService.findUserById(params.id);
        return user;
    }
    async updateUser(id, dto, context) {
        this.commonService.acknowledgeMessage(context);
        const user = await this.userService.updateUser(id, dto);
        return user;
    }
    async deleteUser(id, dto, context) {
        this.commonService.acknowledgeMessage(context);
        const { password } = dto;
        return await this.userService.deleteUser(id, password);
    }
};
exports.UserController = UserController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-me' }),
    __param(0, (0, microservices_1.Payload)('id')),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-all-users' }),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationQueryDto,
        microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "fetchUsers", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-single-user' }),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_params_dto_1.GetUserParams,
        microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update-user' }),
    __param(0, (0, microservices_1.Payload)('id')),
    __param(1, (0, microservices_1.Payload)('updateOptions')),
    __param(2, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto,
        microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete-user' }),
    __param(0, (0, microservices_1.Payload)('id')),
    __param(1, (0, microservices_1.Payload)('deleteOptions')),
    __param(2, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, delete_user_dto_1.DeleteUserDto,
        microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        common_service_1.CommonService])
], UserController);
//# sourceMappingURL=user.controller.js.map