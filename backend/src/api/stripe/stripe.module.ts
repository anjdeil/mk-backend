import { Module } from '@nestjs/common';

import { CardsModule } from './cards/cards.module';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    CoreModule,
    CardsModule,
    SubscriptionsModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
