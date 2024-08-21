import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  BILLING_ADDRESS_REPOSITORY,
  CART_REPOSITORY,
  CATEGORY_REPOSITORY,
  CONTENT_REPOSITORY,
  INNER_TRANSACTIONS_REPOSITORY,
  INSTRUMENTS_REPOSITORY,
  KEYS_REPOSITORY,
  MEDIA_CONTENT_REPOSITORY,
  MOODS_REPOSITORY,
  MUSICS_REPOSITORY,
  MUSIC_CATEGORIES_REPOSITORY,
  MUSIC_COMMENTS_REPOSITORY,
  MUSIC_FAVORITES_REPOSITORY,
  MUSIC_FILES_REPOSITORY,
  MUSIC_HISTORY_REPOSITORY,
  MUSIC_INSTRUMENTS_REPOSITORY,
  MUSIC_KEYS_REPOSITORY,
  MUSIC_MOODS_REPOSITORY,
  MUSIC_TYPES_REPOSITORY,
  NOTIFICATION_REPOSITORY,
  PAYOUT_REPOSITORY,
  REPORTS_REPOSITORY,
  RESET_PASSWORD_REPOSITORY,
  SALES_REPOSITORY,
  SETTINGS_REPOSITORY,
  TRACK_TYPES_REPOSITORY,
  TRANSACTION_REPOSITORY,
  USER_REPOSITORY,
  WITHDRAWAL_REPOSITORY,
  PLAYLIST_REPOSITORY,
  PLAYLIST_MUSICS_REPOSITORY,
  HELP_REQUEST_REPOSITORY,
  FOLLOW_REPOSITORY,
  PLAYLIST_FOLLOWS_REPOSITORY,
} from '../constants';
import { IsAdminGuard } from '../guards';
import { DoesUserExistGuard } from '../guards/doesUserExist.guard';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { JwtQueryGuard } from '../guards/jwtQuery.guard';
import { JwtRefreshGuard } from '../guards/jwtRefresh.guard';
import { SubscribedGuard } from '../guards/subscribedUser.guard';
import { CommonFilterMiddleware, LoggerMiddleware } from '../middlewares';
import { MediaContent, Playlist, PlaylistMusic } from '../models';
import BillingAddress from '../models/billingAddress.entity';
import Cart from '../models/cart.entity';
import Category from '../models/category.entity';
import MusicsComments from '../models/comments.entity';
import Content from '../models/content.entity';
import MusicsFavorites from '../models/favorites.entity';
import Follow from '../models/follow.entity';
import Help from '../models/help.entity';
import MusicsHistory from '../models/history.entity';
import InnerTransactions from '../models/innerTransactions.entity';
import Instrument from '../models/instrument.entity';
import Key from '../models/key.entity';
import Mood from '../models/mood.entity';
import Music from '../models/music.entity';
import MusicCategory from '../models/musicCategories.entity';
import MusicFiles from '../models/musicFiles.entity';
import MusicIntruments from '../models/musicInstruments.entity';
import MusicKeys from '../models/musicKeys.entity';
import MusicMoods from '../models/musicMoods.entity';
import MusicTypes from '../models/musicTypes.entity';
import Notifications from '../models/notifications.entity';
import Payout from '../models/payout.entity';
import PlaylistFollowEntity from '../models/playlistFollow.entity';
import PlaylistFollow from '../models/playlistFollow.entity';
import Reports from '../models/reports.entity';
import ResetPassword from '../models/resetPassword.entity';
import Sales from '../models/sales.entity';
import TrackType from '../models/trackType.entity';
import Transactions from '../models/transactions.entity';
import User from '../models/user.entity';
import Settings from '../models/userSettings.entity';
import Withdrawal from '../models/withdrawal.entity';
import { MediaContentRepository, PlaylistsRepository } from '../repositories';
import { BillingAddressRepository } from '../repositories/billingAdress.repository';
import { CartRepository } from '../repositories/cart.repository';
import { CategoriesRepository } from '../repositories/categories.repository';
import { MusicsCommentsRepository } from '../repositories/comments.repository';
import { ContentRepository } from '../repositories/content.repository';
import { MusicsFavoritesRepository } from '../repositories/favorites.repository';
import { MusicsFilesRepository } from '../repositories/files.repository';
import { FollowRepository } from '../repositories/follow.repository';
import { HelpRequestRepository } from '../repositories/help.repository';
import { MusicsHistoryRepository } from '../repositories/history.repository';
import { InnerTransactionsRepository } from '../repositories/innerTransactions.repository';
import { InstrumentsRepository } from '../repositories/instruments.repository';
import { KeysRepository } from '../repositories/keys.repository';
import { MoodsRepository } from '../repositories/moods.repository';
import { MusicsRepository } from '../repositories/musics.repository';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { PayoutRepository } from '../repositories/payout.repository';
import { ReportRepository } from '../repositories/report.repository';
import { ResetPasswordRepository } from '../repositories/resetPassword.repository';
import { SalesRepository } from '../repositories/sales.repository';
import { TypesRepository } from '../repositories/trackTypes.repository';
import { TransactionsRepository } from '../repositories/transactions.repository';
import { UsersRepository } from '../repositories/users.repository';
import { SettingsRepository } from '../repositories/userSettings.repository';
import { WithdrawalRepository } from '../repositories/withdrawal.repository';
import { SocketService } from '../services/socket/socket.service';
import { JwtQueryStrategy, RefreshStrategy } from '../strategies';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { JwtOptionalStrategy } from '../strategies/jwtOptional.strategy';
import {PlaylistFollowRepository} from "../repositories/playlistFollow.repository";

const CoreProviders: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
  {
    provide: RESET_PASSWORD_REPOSITORY,
    useValue: ResetPassword,
  },
  {
    provide: CATEGORY_REPOSITORY,
    useValue: Category,
  },
  {
    provide: TRACK_TYPES_REPOSITORY,
    useValue: TrackType,
  },
  {
    provide: INSTRUMENTS_REPOSITORY,
    useValue: Instrument,
  },
  {
    provide: MOODS_REPOSITORY,
    useValue: Mood,
  },
  {
    provide: KEYS_REPOSITORY,
    useValue: Key,
  },
  {
    provide: MUSICS_REPOSITORY,
    useValue: Music,
  },
  {
    provide: MUSIC_CATEGORIES_REPOSITORY,
    useValue: MusicCategory,
  },
  {
    provide: MUSIC_INSTRUMENTS_REPOSITORY,
    useValue: MusicIntruments,
  },
  {
    provide: MUSIC_TYPES_REPOSITORY,
    useValue: MusicTypes,
  },
  {
    provide: MUSIC_MOODS_REPOSITORY,
    useValue: MusicMoods,
  },
  {
    provide: MUSIC_KEYS_REPOSITORY,
    useValue: MusicKeys,
  },
  {
    provide: MUSIC_FAVORITES_REPOSITORY,
    useValue: MusicsFavorites,
  },
  {
    provide: MUSIC_HISTORY_REPOSITORY,
    useValue: MusicsHistory,
  },
  {
    provide: MUSIC_COMMENTS_REPOSITORY,
    useValue: MusicsComments,
  },
  {
    provide: MUSIC_FILES_REPOSITORY,
    useValue: MusicFiles,
  },
  {
    provide: SALES_REPOSITORY,
    useValue: Sales,
  },
  {
    provide: TRANSACTION_REPOSITORY,
    useValue: Transactions,
  },
  {
    provide: CART_REPOSITORY,
    useValue: Cart,
  },
  {
    provide: WITHDRAWAL_REPOSITORY,
    useValue: Withdrawal,
  },
  {
    provide: BILLING_ADDRESS_REPOSITORY,
    useValue: BillingAddress,
  },
  {
    provide: PAYOUT_REPOSITORY,
    useValue: Payout,
  },
  {
    provide: PLAYLIST_REPOSITORY,
    useValue: Playlist,
  },
  {
    provide: PLAYLIST_FOLLOWS_REPOSITORY,
    useValue: PlaylistFollow,
  },
  {
    provide: PLAYLIST_MUSICS_REPOSITORY,
    useValue: PlaylistMusic,
  },
  {
    provide: NOTIFICATION_REPOSITORY,
    useValue: Notifications,
  },
  {
    provide: SETTINGS_REPOSITORY,
    useValue: Settings,
  },
  {
    provide: REPORTS_REPOSITORY,
    useValue: Reports,
  },
  {
    provide: CONTENT_REPOSITORY,
    useValue: Content,
  },
  {
    provide: FOLLOW_REPOSITORY,
    useValue: Follow,
  },
  {
    provide: HELP_REQUEST_REPOSITORY,
    useValue: Help,
  },
  {
    provide: MEDIA_CONTENT_REPOSITORY,
    useValue: MediaContent,
  },
  {
    provide: INNER_TRANSACTIONS_REPOSITORY,
    useValue: InnerTransactions,
  },
  InnerTransactionsRepository,
  SettingsRepository,
  NotificationsRepository,
  BillingAddressRepository,
  ReportRepository,
  PayoutRepository,
  CategoriesRepository,
  MusicsRepository,
  UsersRepository,
  InstrumentsRepository,
  MoodsRepository,
  WithdrawalRepository,
  KeysRepository,
  MoodsRepository,
  TypesRepository,
  MusicsFavoritesRepository,
  MusicsHistoryRepository,
  MusicsCommentsRepository,
  MusicsFilesRepository,
  SalesRepository,
  TransactionsRepository,
  CartRepository,
  ResetPasswordRepository,
  ContentRepository,
  MediaContentRepository,
  JwtAuthGuard,
  JwtRefreshGuard,
  DoesUserExistGuard,
  JwtQueryGuard,
  IsAdminGuard,
  JwtService,
  JwtStrategy,
  JwtQueryStrategy,
  JwtOptionalStrategy,
  RefreshStrategy,
  SubscribedGuard,
  CommonFilterMiddleware,
  LoggerMiddleware,
  SocketService,
  PlaylistsRepository,
  PlaylistFollowRepository,
  FollowRepository,
  HelpRequestRepository,
];

export default CoreProviders;
