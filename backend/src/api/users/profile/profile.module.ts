import { Module } from '@nestjs/common';

import { DetailsController } from './deteils/details.controller';
import { DetailsService } from './deteils/details.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { SettingsModule } from './settings/settings.module';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';
import { FollowsModule } from '../../follows/follows.module';

@Module({
  imports: [CoreModule, SharedModule, SettingsModule, FollowsModule],
  providers: [ProfileService, DetailsService],
  controllers: [ProfileController, DetailsController],
})
export class ProfileModule {}
