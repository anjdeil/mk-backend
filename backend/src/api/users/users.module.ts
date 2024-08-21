import { Module } from '@nestjs/common';

import { ProfileModule } from './profile/profile.module';
import { UsersController } from './users.controller';
import { CoreModule } from '../../core/core.module';
import { FollowsModule } from '../follows/follows.module';
@Module({
  imports: [CoreModule, ProfileModule, FollowsModule],
  providers: [],
  controllers: [UsersController],
})
export class UsersModule {}
