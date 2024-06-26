import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configs/config.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [ConfigurationModule, AuthModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
