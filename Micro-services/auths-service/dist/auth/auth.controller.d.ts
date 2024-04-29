import { AuthService } from './auth.service';
import { SignupDto } from 'src/dto/signup.dto';
import { SigninDto } from 'src/dto/signin.dto';
import { ChangePasswordDto } from 'src/dto/changepass.dto';
import { RmqContext } from '@nestjs/microservices';
import { CommonService } from 'src/utils/common';
import { IMessage } from 'src/interfaces/message.interface';
import { IAuthUser } from 'src/interfaces/user.interface';
export declare class AuthController {
    private readonly authService;
    private readonly commonService;
    constructor(authService: AuthService, commonService: CommonService);
    signUp(signUpDto: SignupDto, origin: string | undefined, context: RmqContext): Promise<IMessage>;
    signIn(signInDto: SigninDto, origin: string | undefined, context: RmqContext): Promise<IAuthUser>;
    logout(userId: number, context: RmqContext): Promise<string>;
    verifyToken(data: any, context: RmqContext): Promise<import("src/interfaces/user.interface").User>;
    changePassword(ChangePasswordDto: ChangePasswordDto, origin: string | undefined, context: RmqContext): Promise<string>;
}
