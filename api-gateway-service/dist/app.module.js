"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayModule = void 0;
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const config_module_1 = require("./configs/config.module");
const utils_module_1 = require("./utils/utils.module");
const auth_gateway_module_1 = require("./modules/auth-gateway.module");
const auth_guard_1 = require("./guards/auth-guard");
const user_gateway_module_1 = require("./modules/user-gateway.module");
const flight_gateway_module_1 = require("./modules/flight-gateway.module");
const hotel_gateway_module_1 = require("./modules/hotel-gateway.module");
let ApiGatewayModule = class ApiGatewayModule {
};
exports.ApiGatewayModule = ApiGatewayModule;
exports.ApiGatewayModule = ApiGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_gateway_module_1.AuthGatewayModule,
            utils_module_1.UtilsModule,
            user_gateway_module_1.UserGatewayModule,
            flight_gateway_module_1.FlightGatewayModule,
            hotel_gateway_module_1.HotelGatewayModule,
            config_module_1.ConfigurationModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: 'AUTH_SERVICE',
                useFactory: (configService) => {
                    const URL = configService.get('rabbitmq_url');
                    const queue = configService.get('authQueue');
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
    })
], ApiGatewayModule);
//# sourceMappingURL=app.module.js.map