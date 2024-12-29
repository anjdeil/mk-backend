import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne,
} from 'sequelize-typescript';

import BillingAddress from './billingAddress.entity';
import MusicsComments from './comments.entity';
import MusicsFavorites from './favorites.entity';
import Follow from './follow.entity';
import MusicsHistory from './history.entity';
import { Playlist } from './index';
import Music from './music.entity';
import MusicFiles from './musicFiles.entity';
import Payout from './payout.entity';
import PlaylistFollow from './playlistFollow.entity';
import ResetPassword from './resetPassword.entity';
import Sales from './sales.entity';
import Transactions from './transactions.entity';
import { Roles } from '../enums/roles';
import { TUser } from '../types/user';

@Table({ tableName: 'users', freezeTableName: true, paranoid: true })
export default class User extends Model<TUser> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  pseudonym: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  biography: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  confirmed: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: Roles.BUYER,
  })
  role: Roles;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  stripeId: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  subscribedUntil: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  subscriptionPriceId: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  verified: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  onVerification: boolean;

  @HasMany(() => ResetPassword)
  resetPasswords: ResetPassword[];

  @HasMany(() => Sales)
  sales: Sales[];

  @HasMany(() => Transactions)
  transactions: Transactions[];

  @HasMany(() => MusicFiles)
  musicFiles: MusicFiles[];

  @HasMany(() => Music)
  musics: Music[];

  @HasMany(() => MusicsComments)
  comments: MusicsComments[];

  @HasMany(() => MusicsFavorites)
  favorites: MusicsFavorites[];

  @HasMany(() => MusicsHistory)
  history: MusicsHistory[];

  @HasOne(() => BillingAddress)
  billingAddress: BillingAddress;

  @HasOne(() => Payout)
  payout: Payout;

  @HasMany(() => Transactions, 'senderId')
  sentTransactions: Transactions[];

  @HasMany(() => Transactions, 'recipientId')
  receivedTransactions: Transactions[];

  @HasMany(() => Playlist, { foreignKey: 'ownerId' })
  playlists: Playlist[];

  @HasMany(() => PlaylistFollow, { foreignKey: 'userId' })
  playlistFollows: PlaylistFollow[];

  @HasMany(() => Follow, 'followingId')
  following: Follow[];

  @HasMany(() => Follow, 'followerId')
  followers: Follow[];
}
