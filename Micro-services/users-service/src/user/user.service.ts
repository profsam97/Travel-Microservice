import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
// @Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async getCurrentUser(userId: number): Promise<any> {
    const user: any = await prisma.user.findUnique({
      where: { id: userId },
    });
    const { email, username } = user;
    const userDetails = {
      email,
      username,
    };
    return userDetails;
  }
  async findAllUsers(page?: number, perPage?: number) {
    const skip = page && perPage ? (page - 1) * perPage : undefined;
    const take = perPage ? perPage : undefined;
    return prisma.user.findMany({
      skip,
      take,
    });
  }
  async findUserById(userId: string) {
    const id = parseInt(userId);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const { email, username, id: uid } = user;
    const userDetails = {
      email,
      username,
      id: uid,
    };
    return userDetails;
  }
  async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<any> {
    const { username } = updateUserDto;

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // Only allow the user to update their username
    if (username) {
      await prisma.user.update({
        where: { id: userId },
        data: { username },
      });
    }

    // Return updated user
    return await prisma.user.findUnique({ where: { id: userId } });
  }
  async deleteUser(userId: number, password: string): Promise<string> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password.');
    }

    await prisma.user.delete({ where: { id: userId } });

    return 'User deleted successfully';
  }
}
