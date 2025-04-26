import { Module } from '@nestjs/common';
import { EnvService } from 'src/shared/env-service/env-service';

@Module({
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
