import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigurationModule } from './configs/config.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [ConfigurationModule, UserModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
