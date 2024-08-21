import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import MusicFiles from './musicFiles.entity';
import Transactions from './transactions.entity';
import User from './user.entity';
import { TSales } from '../types/sales';

@Table({ tableName: 'sales', freezeTableName: true })
export default class Sales extends Model<TSales> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => MusicFiles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fileId: number;

  @ForeignKey(() => Transactions)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  transactionId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => MusicFiles)
  file: MusicFiles;

  @BelongsTo(() => Transactions)
  transaction: Transactions;
}
