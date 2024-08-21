import { Module } from '@nestjs/common';

import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { CoreModule } from '../../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
