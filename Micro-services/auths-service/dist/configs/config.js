"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
function config() {
    return {
        rabbitmq_url: process.env.RABBITMQ_URL,
        authQueue: process.env.RABBITMQ_AUTH_QUEUE,
    };
}
exports.config = config;
//# sourceMappingURL=config.js.map