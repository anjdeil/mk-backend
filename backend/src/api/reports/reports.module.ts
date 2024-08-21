import { Module } from '@nestjs/common';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { CoreModule } from '../../core/core.module';
@Module({
  imports: [CoreModule],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
