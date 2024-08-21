import { Module } from '@nestjs/common';

import { SocketGateway } from './socket.gateway';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
