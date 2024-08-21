import { Module } from '@nestjs/common';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CoreModule } from '../../../core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
