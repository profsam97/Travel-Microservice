import { JwtService } from '@nestjs/jwt';
import { SignupDto } from 'src/dto/signup.dto';
import { SigninDto } from 'src/dto/signin.dto';
import { ChangePasswordDto } from 'src/dto/changepass.dto';
import { IAuthUser, User } from '../interfaces/user.interface';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signup(signupDto: SignupDto): Promise<any>;
    signin(signinDto: SigninDto): Promise<IAuthUser>;
    validateUser(email: string, password: string): Promise<User>;
    uniqueUser(email: string): Promise<User>;
    verifyToken(token: string): Promise<User>;
    logout(userId: number): Promise<string>;
    changePassword(changePasswordDto: ChangePasswordDto): Promise<string>;
}
