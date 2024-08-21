import { Module } from '@nestjs/common';

import { HelpController } from './help.controller';
import { HelpService } from './help.service';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [CoreModule, SharedModule],
  providers: [HelpService],
  controllers: [HelpController],
})
export class HelpModule {}
