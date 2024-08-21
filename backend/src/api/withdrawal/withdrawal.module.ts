import { Module } from '@nestjs/common';

import { WithdrawalController } from './withdrawal.controller';
import { WithdrawalService } from './withdrawal.service';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [WithdrawalController],
  providers: [WithdrawalService],
})
export class WithdrawalModule {}
