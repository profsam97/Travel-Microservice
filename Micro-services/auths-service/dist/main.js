"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const ms_connection_config_1 = require("./configs/ms-connection.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.connectMicroservice(ms_connection_config_1.microserviceOptions);
    app.startAllMicroservices();
    await app.listen(6000);
}
bootstrap();
//# sourceMappingURL=main.js.map