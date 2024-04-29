import { IMessage } from 'src/interfaces/message.interface';
export declare class MessageMapper implements IMessage {
    id: string;
    message: string;
    constructor(message: string);
}
