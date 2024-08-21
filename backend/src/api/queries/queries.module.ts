import { Module } from '@nestjs/common';

import { QueriesController } from './queries.controller';
import { QueriesService } from './queries.service';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [QueriesService],
  controllers: [QueriesController],
})
export class QueriesModule {}
