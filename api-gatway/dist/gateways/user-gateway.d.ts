import { ClientProxy } from '@nestjs/microservices';
import { GetUserParams, UpdateUserDto, DeleteUserDto } from '../dtos/user';
import { CommonService } from '../utils/common/common.service';
import { PaginationQueryDto } from '../dtos/pagination.dto';
import { IAuthResponseUser, IResponseUser } from '../interfaces/user.interface';
export declare class UserGateway {
    private readonly userService;
    private readonly commonService;
    constructor(userService: ClientProxy, commonService: CommonService);
    GetMe(id: number): Promise<IAuthResponseUser>;
    GetAllUsers(params: PaginationQueryDto): Promise<IAuthResponseUser[]>;
    GetUser(params: GetUserParams): Promise<IResponseUser>;
    UpdateUser(id: number, dto: UpdateUserDto): Promise<IResponseUser>;
    DeleteUser(id: number, dto: DeleteUserDto): Promise<void>;
}
