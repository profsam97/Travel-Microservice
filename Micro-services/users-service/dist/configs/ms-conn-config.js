"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.microserviceOptions = void 0;
const microservices_1 = require("@nestjs/microservices");
exports.microserviceOptions = {
    transport: microservices_1.Transport.RMQ,
    options: {
        urls: [`amqp://${process.env.RABBITMQ_URL}`],
        queue: `${process.env.RABBITMQ_USER_QUEUE}`,
        noAck: false,
        queueOptions: {
            durable: true,
        },
    },
};
//# sourceMappingURL=ms-conn-config.js.map