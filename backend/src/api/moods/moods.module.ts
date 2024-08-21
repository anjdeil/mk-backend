import { Module } from '@nestjs/common';

import { MoodsController } from './moods.controller';
import { MoodsService } from './moods.service';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [MoodsService],
  controllers: [MoodsController],
})
export class MoodsModule {}
