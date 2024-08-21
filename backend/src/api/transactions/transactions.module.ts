import { Module } from '@nestjs/common';

import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
