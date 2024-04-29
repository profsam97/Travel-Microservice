import {
  Body,
  Controller,
  Res,
  Inject,
  Post,
  Req,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { SignupDto } from 'src/dtos/auth/signup.dto';
import { SigninDto } from 'src/dtos/auth/signin.dto';
import { ChangePasswordDto } from 'src/dtos/auth/change-password.dto';
import { CommonService } from 'src/utils/common/common.service';
import { IMessage } from 'src/interfaces';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Public } from 'src/decorators';

@Controller('api/v1/auth')
export class AuthGateway {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly commonService: CommonService,
  ) {}

  @Public()
  @Post('/sign-up')
  public async SignUp(@Body() signUpDto: SignupDto): Promise<IMessage> {
    const signUpOptions = signUpDto;

    return await this.commonService.sendEvent(
      this.authService,
      { cmd: 'sign-up' },
      { signUpOptions },
    );
  }

  @Public()
  @Post('/sign-in')
  public async SignIn(
    @Res() res: Response,
    @Body() signInDto: SigninDto,
  ): Promise<void> {
    const signInOptions = signInDto;
    const result = await this.commonService.sendEvent(
      this.authService,
      { cmd: 'sign-in' },
      { signInOptions },
    );

    res.status(HttpStatus.OK).json(result);
  }

  @Post('/logout')
  public async Logout(
    @CurrentUser() userId: number,
    @Req() req: any,
    @Res() res: Response,
  ): Promise<void> {
    const message = await this.commonService.sendEvent(
      this.authService,
      { cmd: 'logout' },
      { userId },
    );

    res
      .header('Content-Type', 'application/json')
      .status(HttpStatus.OK)
      .send(message);
  }

  @Public()
  @Patch('/update-password')
  public async UpdatePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Res() res: Response,
  ): Promise<void> {
    const changePassword = changePasswordDto;
    const result = await this.commonService.sendEvent(
      this.authService,
      { cmd: 'change-password' },
      { changePassword },
    );

    res.status(HttpStatus.OK).send(result);
  }
}
