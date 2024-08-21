import {
  Table,
  ForeignKey,
  Model,
  BelongsTo,
  PrimaryKey,
  Column,
  DataType,
} from 'sequelize-typescript';

import Music from './music.entity';
import User from './user.entity';
import { THistory } from '../types/history';

@Table({ tableName: 'history', freezeTableName: true })
export default class MusicsHistory extends Model<THistory> {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @PrimaryKey
  @ForeignKey(() => Music)
  @Column({
    type: DataType.INTEGER,
  })
  musicId: number;

  @PrimaryKey
  @Column({
    type: DataType.DATE,
  })
  declare createdAt: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Music)
  music: Music;
}
