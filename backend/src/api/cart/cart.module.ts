import { Module } from '@nestjs/common';

import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CoreModule } from '../../core/core.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CoreModule, AuthModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
