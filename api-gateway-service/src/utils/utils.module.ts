import { Module, Global } from '@nestjs/common';
import { CommonService } from './common/common.service';

@Global()
@Module({
  imports: [],
  providers: [CommonService],
  exports: [CommonService],
})
export class UtilsModule {}
