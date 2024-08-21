import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CoreModule } from '../../core/core.module';
import { JwtStrategy } from '../../core/strategies';
import { SharedModule } from '../../shared/shared.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [CoreModule, PassportModule, UsersModule, SharedModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
