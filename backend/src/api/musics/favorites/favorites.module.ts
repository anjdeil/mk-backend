import { Module } from '@nestjs/common';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { CoreModule } from '../../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
