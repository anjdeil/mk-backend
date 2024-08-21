import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';

import MusicFiles from './musicFiles.entity';
import User from './user.entity';
import { TCart } from '../types/cart';

@Table({ tableName: 'cart', freezeTableName: true, timestamps: false })
export default class Cart extends Model<TCart> {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @PrimaryKey
  @ForeignKey(() => MusicFiles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fileId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => MusicFiles)
  musicFile: MusicFiles;
}
