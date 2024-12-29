import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';

import User from './user.entity';
import { NotificationType } from '../enums/notifications';
import { TNotification } from '../types/notification';

@Table({ tableName: 'notifications', freezeTableName: true, timestamps: true })
export default class Notifications extends Model<TNotification> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  read: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  link: string;

  @Column({
    type: DataType.ENUM(
      NotificationType.MUSIC_PUBLISHED,
      NotificationType.MUSIC_APPROVED,
      NotificationType.MUSIC_DECLINED,
      NotificationType.MUSIC_BLOCKED,
      NotificationType.MUSIC_BOUGHT,
      NotificationType.MUSIC_FAVORITES,
      NotificationType.MUSIC_MAX_PUBLISHED,
      NotificationType.COMMENTED_TO_MUSIC,
      NotificationType.COMMENTED_TO_COMMENT,
      NotificationType.UPGRAFE_ACCOUNT,
      NotificationType.UPGRAFE_ACCOUNT_PRO,
      NotificationType.SUBSCRIPTION_EXPIRED,
      NotificationType.TOP_UP_BALANCE,
      NotificationType.WITHDRAWAL,
      NotificationType.WITHDRAWAL_REJECTED,
      NotificationType.FOLLOWING_USER_ACTION,
      NotificationType.NEW_FOLLOWER,
      NotificationType.NEW_PLAYLISTS_FOLLOWER,
    ),
    allowNull: false,
  })
  type: NotificationType;

  @BelongsTo(() => User)
  user: User;
}
