import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from 'src/infra/controllers/app/app.controller'

import { EnvModule } from './env.module'
import { UserModule } from './user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EnvModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
