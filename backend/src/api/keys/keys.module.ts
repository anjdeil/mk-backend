import { Module } from '@nestjs/common';

import { KeysController } from './keys.controller';
import { KeysService } from './keys.service';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [KeysService],
  controllers: [KeysController],
})
export class KeysModule {}
