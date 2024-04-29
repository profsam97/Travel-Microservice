import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { DeleteUserDto } from 'src/dtos/delete-user.dto';
import { CommonService } from 'src/utils/common/common.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { IAuthResponseUser } from './interfaces/auth-response.interface';
import { PaginationQueryDto } from 'src/dtos/pagination.dto';
import { GetUserParams } from 'src/dtos/get-user-params.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'get-me' })
  public async getMe(
    @Payload('id') id: number,
    @Ctx() context: RmqContext,
  ): Promise<IAuthResponseUser> {
    this.commonService.acknowledgeMessage(context);
    const user = await this.userService.getCurrentUser(id);
    return user;
  }

  @MessagePattern({ cmd: 'get-all-users' })
  public async fetchUsers(
    @Payload() params: PaginationQueryDto,
    @Ctx() context: RmqContext,
  ): Promise<any[]> {
    this.commonService.acknowledgeMessage(context);
    const { page, perPage } = params;
    const users = await this.userService.findAllUsers(page, perPage);
    return users;
  }

  @MessagePattern({ cmd: 'get-single-user' })
  public async getUser(
    @Payload() params: GetUserParams,
    @Ctx() context: RmqContext,
  ): Promise<IAuthResponseUser> {
    this.commonService.acknowledgeMessage(context);

    const user = await this.userService.findUserById(params.id);
    return user;
  }

  @MessagePattern({ cmd: 'update-user' })
  public async updateUser(
    @Payload('id') id: number,
    @Payload('updateOptions') dto: UpdateUserDto,
    @Ctx() context: RmqContext,
  ): Promise<any> {
    this.commonService.acknowledgeMessage(context);

    const user = await this.userService.updateUser(id, dto);
    return user;
  }

  @MessagePattern({ cmd: 'delete-user' })
  public async deleteUser(
    @Payload('id') id: number,
    @Payload('deleteOptions') dto: DeleteUserDto,
    @Ctx() context: RmqContext,
  ): Promise<string> {
    this.commonService.acknowledgeMessage(context);
    const { password } = dto;
    return await this.userService.deleteUser(id, password);
  }
}
