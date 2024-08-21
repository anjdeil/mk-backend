import { Module } from '@nestjs/common';

import { FollowsController } from './follows.controller';
import { FollowService } from './follows.service';
import { CoreModule } from '../../core/core.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [CoreModule, NotificationsModule],
    providers: [FollowService],
    controllers: [FollowsController],
})
export class FollowsModule {}
