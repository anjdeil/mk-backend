import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CategoriesModule } from './categories/categories.module';
import { ContentModule } from './content/content.module';
import { FollowsModule } from './follows/follows.module';
import { HelpModule } from './help/help.module';
import { InstrumentsModule } from './instruments/instruments.module';
import { KeysModule } from './keys/keys.module';
import { MoodsModule } from './moods/moods.module';
import { MusicsModule } from './musics/musics.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PlaylistFollowModule } from './playlist/playlist-follow/playlist-follow.module';
import { PlaylistModule } from './playlist/playlist.module';
import { QueriesModule } from './queries/queries.module';
import { ReportsModule } from './reports/reports.module';
import { SalesModule } from './sales/sales.module';
import { SearchModule } from './search/search.module';
import { SocketModule } from './socket/socket.module';
import { StripeModule } from './stripe/stripe.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TypesModule } from './types/types.module';
import { UsersModule } from './users/users.module';
import { WithdrawalModule } from './withdrawal/withdrawal.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CategoriesModule,
    InstrumentsModule,
    MoodsModule,
    KeysModule,
    TypesModule,
    MusicsModule,
    StripeModule,
    CartModule,
    SalesModule,
    TransactionsModule,
    WithdrawalModule,
    SearchModule,
    QueriesModule,
    ReportsModule,
    SocketModule,
    HelpModule,
    NotificationsModule,
    ContentModule,
    FollowsModule,
    PlaylistModule,
    PlaylistFollowModule,
  ],
  providers: [],
})
export class ApiModule {}
