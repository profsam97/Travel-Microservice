import { RmqContext, ClientProxy } from '@nestjs/microservices';
import { IPattern } from '../interfaces';
export declare class CommonService {
    constructor();
    acknowledgeMessage(context: RmqContext): void;
    sendEvent(client: ClientProxy, pattern: IPattern, data: any): Promise<any>;
}
