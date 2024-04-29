"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
function config() {
    return {
        rabbitmq_url: process.env.RABBITMQ_URL,
        authQueue: process.env.RABBITMQ_AUTH_QUEUE,
        userQueue: process.env.RABBITMQ_USER_QUEUE,
        hotelQueue: process.env.RABBITMQ_HOTEL_QUEUE,
        flightQueue: process.env.RABBITMQ_FLIGHT_QUEUE,
    };
}
exports.config = config;
//# sourceMappingURL=config.js.map