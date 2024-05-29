// auth.controller.ts

import {BadRequestException, Controller} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SignupDto} from 'src/dto/signup.dto';
import {SigninDto} from 'src/dto/signin.dto';
import {ChangePasswordDto} from 'src/dto/changepass.dto';
import {Ctx, MessagePattern, Payload, RmqContext, RpcException,} from '@nestjs/microservices';
import {CommonService} from 'src/utils/common';
import {IMessage} from 'src/interfaces/message.interface';
import {IAuthUser} from 'src/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'sign-up' })
  public async signUp(
    @Payload('signUpOptions') signUpDto: SignupDto,
    @Payload('origin') origin: string | undefined,
    @Ctx() context: RmqContext,
  ): Promise<IMessage> {
    this.commonService.acknowledgeMessage(context);

    try {
        return await this.authService.signup(signUpDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new RpcException({
          statusCode: 400,
          message: error.message,
          error: error.name,
        });
      } else {
        throw new RpcException({
          statusCode: 500,
          message: 'Internal server error',
          error: 'InternalServerError',
        });
      }
    }
  }

  @MessagePattern({ cmd: 'sign-in' })
  public async signIn(
    @Payload('signInOptions') signInDto: SigninDto,
    @Payload('origin') origin: string | undefined,
    @Ctx() context: RmqContext,
  ): Promise<IAuthUser> {
    this.commonService.acknowledgeMessage(context);

    return await this.authService.signin(signInDto);
  }

  @MessagePattern({ cmd: 'logout' })
  public async logout(
    @Payload('userId') userId: number,
    @Ctx() context: RmqContext,
  ): Promise<string> {
    this.commonService.acknowledgeMessage(context);
    return await this.authService.logout(userId);
  }
  @MessagePattern({ cmd: 'verify-token' })
  public async verifyToken(@Payload() data: any, @Ctx() context: RmqContext) {
    const { token } = data;
    this.commonService.acknowledgeMessage(context);
    try {
        return await this.authService.verifyToken(token);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new RpcException({
          statusCode: 400,
          message: error.message,
          error: error.name,
        });
      } else {
        throw new RpcException({
          statusCode: 500,
          message: 'Internal server error',
          error: 'InternalServerError',
        });
      }
    }
  }

  @MessagePattern({ cmd: 'change-password' })
  public async changePassword(
    @Payload('changePassword') ChangePasswordDto: ChangePasswordDto,
    @Payload('origin') origin: string | undefined,
    @Ctx() context: RmqContext,
  ): Promise<string> {
    this.commonService.acknowledgeMessage(context);
    return await this.authService.changePassword(ChangePasswordDto);
  }
}
