import { Transport } from '@nestjs/microservices';
export declare const microserviceOptions: {
    transport: Transport;
    options: {
        urls: string[];
        queue: string;
        noAck: boolean;
        queueOptions: {
            durable: boolean;
        };
    };
};
