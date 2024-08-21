import { Module } from '@nestjs/common';

import { EmailService } from './services/email/email.service';
import { FileStorageService } from './services/file-storage/file-storage.service';

@Module({
  imports: [],
  providers: [FileStorageService, EmailService],
  exports: [FileStorageService, EmailService],
})
export class SharedModule {}
