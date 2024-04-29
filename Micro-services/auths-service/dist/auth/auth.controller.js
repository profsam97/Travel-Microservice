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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signup_dto_1 = require("../dto/signup.dto");
const signin_dto_1 = require("../dto/signin.dto");
const changepass_dto_1 = require("../dto/changepass.dto");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("../utils/common");
let AuthController = class AuthController {
    constructor(authService, commonService) {
        this.authService = authService;
        this.commonService = commonService;
    }
    async signUp(signUpDto, origin, context) {
        this.commonService.acknowledgeMessage(context);
        try {
            const result = await this.authService.signup(signUpDto);
            return result;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new microservices_1.RpcException({
                    statusCode: 400,
                    message: error.message,
                    error: error.name,
                });
            }
            else {
                throw new microservices_1.RpcException({
                    statusCode: 500,
                    message: 'Internal server error',
                    error: 'InternalServerError',
                });
            }
        }
    }
    async signIn(signInDto, origin, context) {
        this.commonService.acknowledgeMessage(context);
        return await this.authService.signin(signInDto);
    }
    async logout(userId, context) {
        this.commonService.acknowledgeMessage(context);
        return await this.authService.logout(userId);
    }
    async verifyToken(data, context) {
        const { token } = data;
        this.commonService.acknowledgeMessage(context);
        try {
            const result = await this.authService.verifyToken(token);
            return result;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new microservices_1.RpcException({
                    statusCode: 400,
                    message: error.message,
                    error: error.name,
                });
            }
            else {
                throw new microservices_1.RpcException({
                    statusCode: 500,
                    message: 'Internal server error',
                    error: 'InternalServerError',
                });
            }
        }
    }
    async changePassword(ChangePasswordDto, origin, context) {
        this.commonService.acknowledgeMessage(context);
        return await this.authService.changePassword(ChangePasswordDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'sign-up' }),
    __param(0, (0, microservices_1.Payload)('signUpOptions')),
    __param(1, (0, microservices_1.Payload)('origin')),
    __param(2, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto, String, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'sign-in' }),
    __param(0, (0, microservices_1.Payload)('signInOptions')),
    __param(1, (0, microservices_1.Payload)('origin')),
    __param(2, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SigninDto, String, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'logout' }),
    __param(0, (0, microservices_1.Payload)('userId')),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'verify-token' }),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'change-password' }),
    __param(0, (0, microservices_1.Payload)('changePassword')),
    __param(1, (0, microservices_1.Payload)('origin')),
    __param(2, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changepass_dto_1.ChangePasswordDto, String, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        common_2.CommonService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map