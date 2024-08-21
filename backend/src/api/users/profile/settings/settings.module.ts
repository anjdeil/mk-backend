import { Module } from '@nestjs/common';

import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { CoreModule } from '../../../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [SettingsService],
  controllers: [SettingsController],
})
export class SettingsModule {}
