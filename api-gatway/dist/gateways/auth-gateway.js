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
exports.AuthGateway = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const signup_dto_1 = require("../dtos/auth/signup.dto");
const signin_dto_1 = require("../dtos/auth/signin.dto");
const change_password_dto_1 = require("../dtos/auth/change-password.dto");
const common_service_1 = require("../utils/common/common.service");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const decorators_1 = require("../decorators");
let AuthGateway = class AuthGateway {
    constructor(authService, commonService) {
        this.authService = authService;
        this.commonService = commonService;
    }
    async SignUp(signUpDto) {
        const signUpOptions = signUpDto;
        return await this.commonService.sendEvent(this.authService, { cmd: 'sign-up' }, { signUpOptions });
    }
    async SignIn(res, signInDto) {
        const signInOptions = signInDto;
        const result = await this.commonService.sendEvent(this.authService, { cmd: 'sign-in' }, { signInOptions });
        res.status(common_1.HttpStatus.OK).json(result);
    }
    async Logout(userId, req, res) {
        const message = await this.commonService.sendEvent(this.authService, { cmd: 'logout' }, { userId });
        res
            .header('Content-Type', 'application/json')
            .status(common_1.HttpStatus.OK)
            .send(message);
    }
    async UpdatePassword(changePasswordDto, res) {
        const changePassword = changePasswordDto;
        const result = await this.commonService.sendEvent(this.authService, { cmd: 'change-password' }, { changePassword });
        res.status(common_1.HttpStatus.OK).send(result);
    }
};
exports.AuthGateway = AuthGateway;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthGateway.prototype, "SignUp", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/sign-in'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, signin_dto_1.SigninDto]),
    __metadata("design:returntype", Promise)
], AuthGateway.prototype, "SignIn", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthGateway.prototype, "Logout", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Patch)('/update-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthGateway.prototype, "UpdatePassword", null);
exports.AuthGateway = AuthGateway = __decorate([
    (0, common_1.Controller)('api/v1/auth'),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        common_service_1.CommonService])
], AuthGateway);
//# sourceMappingURL=auth-gateway.js.map