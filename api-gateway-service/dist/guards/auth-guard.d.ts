import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { CommonService } from 'src/utils/common/common.service';
export declare class AuthGuard implements CanActivate {
    private readonly authService;
    private readonly reflector;
    private readonly commonService;
    constructor(authService: ClientProxy, reflector: Reflector, commonService: CommonService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private setHttpHeader;
}
