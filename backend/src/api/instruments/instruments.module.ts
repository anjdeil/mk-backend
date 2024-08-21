import { Module } from '@nestjs/common';

import { InstrumentsController } from './instruments.controller';
import { InstrumentsService } from './instruments.service';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [InstrumentsService],
  controllers: [InstrumentsController],
})
export class InstrumentsModule {}
