"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelGatewayModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
const utils_module_1 = require("../utils/utils.module");
const hotel_gateway_1 = require("../gateways/hotel-gateway");
let HotelGatewayModule = class HotelGatewayModule {
};
exports.HotelGatewayModule = HotelGatewayModule;
exports.HotelGatewayModule = HotelGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [utils_module_1.UtilsModule],
        providers: [
            {
                provide: 'HOTEL_SERVICE',
                useFactory: (configService) => {
                    const URL = configService.get('rabbitmq_url');
                    const queue = configService.get('hotelQueue');
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [`amqp://${URL}`],
                            queue,
                            queueOptions: {
                                durable: true,
                            },
                        },
                    });
                },
                inject: [config_1.ConfigService],
            },
        ],
        controllers: [hotel_gateway_1.HotelGateway],
    })
], HotelGatewayModule);
//# sourceMappingURL=hotel-gateway.module.js.map