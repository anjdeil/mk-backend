import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import Music from './music.entity';
import Sales from './sales.entity';
import Transcations from './transactions.entity';
import User from './user.entity';
import { MusicExtension } from '../enums/files';
import { TFile } from '../types/file';

@Table({ tableName: 'files', freezeTableName: true })
export default class MusicFiles extends Model<TFile> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: MusicExtension;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cost: number;

  @ForeignKey(() => Music)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  musicId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => Music)
  music: Music;

  @BelongsTo(() => User)
  artist: User;

  @HasMany(() => Transcations)
  transcations: Transcations[];

  @HasMany(() => Sales)
  sales: Sales[];
}
