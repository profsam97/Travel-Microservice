"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CommonService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const class_validator_1 = require("class-validator");
const message_mapper_1 = require("../mappers/message.mapper");
const rxjs_1 = require("rxjs");
const validation_module_1 = require("../validation.module");
let CommonService = CommonService_1 = class CommonService {
    constructor(configService) {
        this.configService = configService;
        this.loggerService = new common_1.Logger(CommonService_1.name);
    }
    getRmqOptions(queue) {
        const URL = this.configService.get('rabbitmq_url');
        return {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [`amqp://${URL}`],
                noAck: false,
                queue,
                queueOptions: {
                    durable: true,
                },
            },
        };
    }
    acknowledgeMessage(context) {
        const channel = context.getChannelRef();
        const message = context.getMessage();
        channel.ack(message);
    }
    async validateEntity(entity) {
        const errors = await (0, class_validator_1.validate)(entity);
        const messages = [];
        for (const error of errors) {
            if (error.constraints) {
                messages.push(...Object.values(error.constraints));
            }
        }
        if (messages.length > 0) {
            throw new microservices_1.RpcException({
                statusCode: 400,
                errorStatus: 'Bad Request',
            });
        }
    }
    checkEntityExistence(entity, name) {
        if ((0, validation_module_1.isNull)(entity) || (0, validation_module_1.isUndefined)(entity)) {
            throw new microservices_1.RpcException({
                statusCode: 404,
                errorStatus: `${name} not found`,
            });
        }
    }
    async saveEntity(entity) {
        try {
            await this.validateEntity(entity);
        }
        catch (error) {
            this.loggerService.error(error);
            throw new microservices_1.RpcException({
                statusCode: 400,
                errorStatus: 'Bad Request',
            });
        }
    }
    async throwInternalError(promise) {
        try {
            return await promise;
        }
        catch (error) {
            this.loggerService.error(error);
            throw new microservices_1.RpcException({
                statusCode: 400,
                errorStatus: 'Bad Request',
            });
        }
    }
    formatName(title) {
        return title
            .trim()
            .replace(/\n/g, ' ')
            .replace(/\s\s+/g, ' ')
            .replace(/\w\S*/g, (w) => w.replace(/^\w/, (l) => l.toUpperCase()));
    }
    generateMessage(message) {
        return new message_mapper_1.MessageMapper(message);
    }
    async sendEvent(client, pattern, data) {
        const observableRes = client.send(pattern, data);
        return await (0, rxjs_1.lastValueFrom)(observableRes);
    }
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = CommonService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CommonService);
//# sourceMappingURL=common.service.js.map