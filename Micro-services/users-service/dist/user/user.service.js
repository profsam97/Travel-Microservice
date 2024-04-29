"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCurrentUser(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        const { email, username } = user;
        const userDetails = {
            email,
            username,
        };
        return userDetails;
    }
    async findAllUsers(page, perPage) {
        const skip = page && perPage ? (page - 1) * perPage : undefined;
        const take = perPage ? perPage : undefined;
        return prisma.user.findMany({
            skip,
            take,
        });
    }
    async findUserById(userId) {
        const id = parseInt(userId);
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        const { email, username, id: uid } = user;
        const userDetails = {
            email,
            username,
            id: uid,
        };
        return userDetails;
    }
    async updateUser(userId, updateUserDto) {
        const { username } = updateUserDto;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        if (username) {
            await prisma.user.update({
                where: { id: userId },
                data: { username },
            });
        }
        return await prisma.user.findUnique({ where: { id: userId } });
    }
    async deleteUser(userId, password) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password.');
        }
        await prisma.user.delete({ where: { id: userId } });
        return 'User deleted successfully';
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map