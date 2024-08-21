import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import Music from './music.entity';
import User from './user.entity';
import { TMusicsComments } from '../types/comments';

@Table({ tableName: 'comments', freezeTableName: true })
export default class MusicsComments extends Model<TMusicsComments> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;

  @ForeignKey(() => Music)
  @Column({
    type: DataType.INTEGER,
  })
  musicId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => MusicsComments)
  @Column({
    type: DataType.INTEGER,
  })
  parentCommentId: number;

  @BelongsTo(() => Music, 'musicId')
  music: Music;

  @BelongsTo(() => User, 'userId')
  user: User;

  @HasMany(() => MusicsComments, 'parentCommentId')
  children: MusicsComments[];

  @BelongsTo(() => MusicsComments, 'parentCommentId')
  parentComment: MusicsComments;
}
