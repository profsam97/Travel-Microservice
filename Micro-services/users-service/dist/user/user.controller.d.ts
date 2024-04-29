import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { DeleteUserDto } from 'src/dtos/delete-user.dto';
import { CommonService } from 'src/utils/common/common.service';
import { RmqContext } from '@nestjs/microservices';
import { IAuthResponseUser } from './interfaces/auth-response.interface';
import { PaginationQueryDto } from 'src/dtos/pagination.dto';
import { GetUserParams } from 'src/dtos/get-user-params.dto';
export declare class UserController {
    private readonly userService;
    private readonly commonService;
    constructor(userService: UserService, commonService: CommonService);
    getMe(id: number, context: RmqContext): Promise<IAuthResponseUser>;
    fetchUsers(params: PaginationQueryDto, context: RmqContext): Promise<any[]>;
    getUser(params: GetUserParams, context: RmqContext): Promise<IAuthResponseUser>;
    updateUser(id: number, dto: UpdateUserDto, context: RmqContext): Promise<any>;
    deleteUser(id: number, dto: DeleteUserDto, context: RmqContext): Promise<string>;
}
