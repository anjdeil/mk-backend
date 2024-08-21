import { Module } from '@nestjs/common';

import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
