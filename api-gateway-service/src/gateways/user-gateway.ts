import {
  Body,
  Controller,
  Inject,
  Query,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CurrentUser, Public } from '../decorators';
import { ClientProxy } from '@nestjs/microservices';
import { GetUserParams, UpdateUserDto, DeleteUserDto } from '../dtos/user';
import { CommonService } from '../utils/common/common.service';
import { PaginationQueryDto } from '../dtos/pagination.dto';
import { IAuthResponseUser, IResponseUser } from '../interfaces/user.interface';

@Controller('api/v1/user')
export class UserGateway {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly commonService: CommonService,
  ) {}

  @Get('/me')
  public async GetMe(@CurrentUser() id: number): Promise<IAuthResponseUser> {
    return await this.commonService.sendEvent(
      this.userService,
      { cmd: 'get-me' },
      { id },
    );
  }
  @Public()
  @Get('/')
  public async GetAllUsers(
    @Query() params: PaginationQueryDto,
  ): Promise<IAuthResponseUser[]> {
    return await this.commonService.sendEvent(
      this.userService,
      { cmd: 'get-all-users' },
      { ...params },
    );
  }

  @Public()
  @Get('/:id')
  public async GetUser(@Param() params: GetUserParams): Promise<IResponseUser> {
    return await this.commonService.sendEvent(
      this.userService,
      { cmd: 'get-single-user' },
      { ...params },
    );
  }

  @Patch('/')
  public async UpdateUser(
    @CurrentUser() id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<IResponseUser> {
    const updateOptions = dto;

    return await this.commonService.sendEvent(
      this.userService,
      { cmd: 'update-user' },
      { id, updateOptions },
    );
  }

  @Delete('/')
  public async DeleteUser(
    @CurrentUser() id: number,
    @Body() dto: DeleteUserDto,
  ): Promise<void> {
    const deleteOptions = dto;
    return await this.commonService.sendEvent(
      this.userService,
      { cmd: 'delete-user' },
      { id, deleteOptions },
    );
  }
}
