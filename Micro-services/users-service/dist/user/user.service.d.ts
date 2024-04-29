import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    getCurrentUser(userId: number): Promise<any>;
    findAllUsers(page?: number, perPage?: number): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        tokens: string[];
    }[]>;
    findUserById(userId: string): Promise<{
        email: string;
        username: string;
        id: number;
    }>;
    updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<any>;
    deleteUser(userId: number, password: string): Promise<string>;
}
