import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { SignupDto } from 'src/dtos/auth/signup.dto';
import { SigninDto } from 'src/dtos/auth/signin.dto';
import { ChangePasswordDto } from 'src/dtos/auth/change-password.dto';
import { CommonService } from 'src/utils/common/common.service';
import { IMessage } from 'src/interfaces';
export declare class AuthGateway {
    private readonly authService;
    private readonly commonService;
    constructor(authService: ClientProxy, commonService: CommonService);
    SignUp(signUpDto: SignupDto): Promise<IMessage>;
    SignIn(res: Response, signInDto: SigninDto): Promise<void>;
    Logout(userId: number, req: any, res: Response): Promise<void>;
    UpdatePassword(changePasswordDto: ChangePasswordDto, res: Response): Promise<void>;
}
