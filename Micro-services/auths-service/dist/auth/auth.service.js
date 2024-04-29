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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async signup(signupDto) {
        const { email, username, password } = signupDto;
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Username or email already exists.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });
        return 'Sign up successfully';
    }
    async signin(signinDto) {
        const { email, password } = signinDto;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
        const { username } = user;
        const userDetails = {
            token,
            email,
            username,
        };
        return userDetails;
    }
    async validateUser(email, password) {
        console.log('sdsds');
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password.');
        }
        return user;
    }
    async uniqueUser(email) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found.');
        }
        return user;
    }
    async verifyToken(token) {
        if (!token) {
            throw new common_1.BadRequestException('No token provided.');
        }
        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.uniqueUser(decoded.email);
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async logout(userId) {
        console.log(userId);
        return 'Logged out successfully.';
    }
    async changePassword(changePasswordDto) {
        const { currentPassword, newPassword, email } = changePasswordDto;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid current password.');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });
        return 'Password changed successfully.';
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map