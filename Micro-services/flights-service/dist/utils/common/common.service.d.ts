import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, ClientProxy } from '@nestjs/microservices';
import { MessageMapper } from '../mappers/message.mapper';
import { IPattern } from '../interfaces/pattern.interface';
export declare class CommonService {
    private readonly configService;
    private readonly loggerService;
    constructor(configService: ConfigService);
    getRmqOptions(queue: string): RmqOptions;
    acknowledgeMessage(context: RmqContext): void;
    validateEntity(entity: Record<string, any>): Promise<void>;
    checkEntityExistence<T>(entity: T | null | undefined, name: string): void;
    saveEntity<T>(entity: T): Promise<void>;
    throwInternalError<T>(promise: Promise<T>): Promise<T>;
    formatName(title: string): string;
    generateMessage(message: string): MessageMapper;
    sendEvent(client: ClientProxy, pattern: IPattern, data: any): Promise<any>;
}
