import { Module } from '@nestjs/common';

import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [CoreModule, SharedModule],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
