import { Module } from '@nestjs/common';

import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [ContentService],
  controllers: [ContentController],
})
export class ContentModule {}
