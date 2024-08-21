import { Module } from '@nestjs/common';

import { TypesController } from './types.controller';
import { TypesService } from './types.service';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [TypesService],
  controllers: [TypesController],
})
export class TypesModule {}
