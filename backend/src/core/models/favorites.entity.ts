import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import Music from './music.entity';
import User from './user.entity';
import { TMusicsFavorites } from '../types/favorite';

@Table({ tableName: 'favorites', freezeTableName: true })
export default class MusicsFavorites extends Model<TMusicsFavorites> {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @PrimaryKey
  @ForeignKey(() => Music)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  musicId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Music)
  music: Music;
}
