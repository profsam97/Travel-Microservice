"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
function config() {
    return {
        rabbitmq_url: process.env.RABBITMQ_URL,
        hotelQueue: process.env.RABBITMQ_HOTEL_QUEUE,
    };
}
exports.config = config;
//# sourceMappingURL=config.js.map