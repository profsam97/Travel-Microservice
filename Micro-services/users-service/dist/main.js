"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const ms_conn_config_1 = require("./configs/ms-conn-config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice(ms_conn_config_1.microserviceOptions);
    app.startAllMicroservices();
    await app.listen(8004);
    common_1.Logger.log('Microservice is listening');
}
bootstrap();
//# sourceMappingURL=main.js.map