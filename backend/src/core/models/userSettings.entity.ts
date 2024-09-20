import
  {
    Column,
    DataType,
    Table,
    BelongsTo,
    Model,
    ForeignKey,
    PrimaryKey,
  } from 'sequelize-typescript';

import User from './user.entity';
import { TSettings, TSettingsItem } from '../types/settings';

@Table({ tableName: 'user-settings', freezeTableName: true, timestamps: false })
export default class Settings extends Model<TSettings>
{
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: {
      email: true,
      push: true,
    },
  })
  comments: TSettingsItem;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: {
      email: true,
      push: true,
    },
  })
  mentions: TSettingsItem;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: {
      email: true,
      push: true,
    },
  })
  favorites: TSettingsItem;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: {
      email: true,
      push: true,
    },
  })
  subscriptions: TSettingsItem;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: {
      email: true,
      push: true,
    },
  })
  sales: TSettingsItem;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: {
      email: true,
      push: true,
    },
  })
  withdrawal: TSettingsItem;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: {
      email: true,
      push: true,
    },
  })
  promotions: TSettingsItem;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: {
      email: true,
      push: true,
    },
  })
  system: TSettingsItem;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: {
      email: true,
      push: true,
    },
  })
  follows: TSettingsItem;

  @BelongsTo(() => User, 'userId')
  user: User;
}
