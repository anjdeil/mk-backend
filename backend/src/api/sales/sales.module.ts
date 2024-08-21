import { Module } from '@nestjs/common';

import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
