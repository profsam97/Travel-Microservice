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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const class_validator_1 = require("class-validator");
const microservices_1 = require("@nestjs/microservices");
const decorators_1 = require("../decorators");
const common_service_1 = require("../utils/common/common.service");
const validation_utils_1 = require("../utils/validation.utils");
let AuthGuard = class AuthGuard {
    constructor(authService, reflector, commonService) {
        this.authService = authService;
        this.reflector = reflector;
        this.commonService = commonService;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(decorators_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const activate = await this.setHttpHeader(context.switchToHttp().getRequest(), isPublic);
        if (!activate) {
            throw new common_1.UnauthorizedException();
        }
        return activate;
    }
    async setHttpHeader(req, isPublic) {
        const auth = req.headers?.authorization;
        if ((0, validation_utils_1.isUndefined)(auth) || (0, validation_utils_1.isNull)(auth) || auth.length === 0) {
            return isPublic;
        }
        const authArr = auth.split(' ');
        const bearer = authArr[0];
        const token = authArr[1];
        if ((0, validation_utils_1.isUndefined)(bearer) || (0, validation_utils_1.isNull)(bearer) || bearer !== 'Bearer') {
            return isPublic;
        }
        if ((0, validation_utils_1.isUndefined)(token) || (0, validation_utils_1.isNull)(token) || !(0, class_validator_1.isJWT)(token)) {
            return isPublic;
        }
        try {
            const formattedPayload = await this.commonService.sendEvent(this.authService, { cmd: 'verify-token' }, { token });
            req.user = formattedPayload.id;
            return true;
        }
        catch (_) {
            return isPublic;
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        core_1.Reflector,
        common_service_1.CommonService])
], AuthGuard);
//# sourceMappingURL=auth-guard.js.map