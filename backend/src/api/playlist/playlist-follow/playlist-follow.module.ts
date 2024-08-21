import { Module } from '@nestjs/common';

import { PlaylistFollowController } from './playlist-follow.controller';
import { PlaylistFollowService } from './playlist-follow.service';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';
import { NotificationsModule } from '../../notifications/notifications.module';

@Module({
  imports: [CoreModule, SharedModule, NotificationsModule],
  providers: [PlaylistFollowService],
  controllers: [PlaylistFollowController],
})
export class PlaylistFollowModule {}
