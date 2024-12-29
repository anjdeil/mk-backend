import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
    SharedModule,
    ApiModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
