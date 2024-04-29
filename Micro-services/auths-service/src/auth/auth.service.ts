// auth.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from 'src/dto/signup.dto';
import { SigninDto } from 'src/dto/signin.dto';
import { ChangePasswordDto } from 'src/dto/changepass.dto';
import { PrismaClient } from '@prisma/client';
import { IAuthUser, User } from '../interfaces/user.interface';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signup(signupDto: SignupDto): Promise<any> {
    const { email, username, password } = signupDto;
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('Username or email already exists.');
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

  async signin(signinDto: SigninDto): Promise<IAuthUser> {
    const { email, password } = signinDto;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    const { username } = user;
    const userDetails: IAuthUser = {
      token,
      email,
      username,
    };
    return userDetails;
  }

  async validateUser(email: string, password: string): Promise<User> {
    console.log('sdsds');
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password.');
    }
    return user;
  }

  async uniqueUser(email: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }

  async verifyToken(token: string): Promise<User> {
    if (!token) {
      throw new BadRequestException('No token provided.');
    }

    try {
      const decoded = this.jwtService.verify(token); // Verify JWT token
      const user = await this.uniqueUser(decoded.email);

      return user; // Attach user information to the request object
    } catch (error) {
      throw new BadRequestException(error); // Token verification failed
    }
  }

  async logout(userId: number): Promise<string> {
    console.log(userId);
    // due to time, will skip this. hoowever if there was enough time, what i will do is that
    // i will make use of both refresh token and access token. the refresh token will be long live,
    // while the access token will be short live. when the user logs out we add the token to
    // backlist
    return 'Logged out successfully.';
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword, email } = changePasswordDto;

    // Find the user by identifier (userId or username)
    const user = await prisma.user.findUnique({ where: { email } });

    // If user not found, throw exception
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // Compare current password with the stored password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid current password.');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return 'Password changed successfully.';
  }
}
