import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CommentsModule } from './comments/comments.module';
import { FavoritesModule } from './favorites/favorites.module';
import { HistoryModule } from './history/history.module';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { FollowsModule } from '../follows/follows.module';

@Module({
  imports: [
    HttpModule,
    CoreModule,
    CommentsModule,
    FavoritesModule,
    HistoryModule,
    SharedModule,
    FollowsModule,
  ],
  providers: [MusicsService],
  controllers: [MusicsController],
})
export class MusicsModule {}
