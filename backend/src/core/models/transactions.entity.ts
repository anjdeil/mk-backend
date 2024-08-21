import {
  BelongsTo,
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  PrimaryKey,
  HasOne,
} from 'sequelize-typescript';

import MusicFiles from './musicFiles.entity';
import Sales from './sales.entity';
import User from './user.entity';
import { TransactionStatus, TransactionType } from '../enums/transactions';
import { TTransactions } from '../types/transaction';

@Table({ tableName: 'transactions', freezeTableName: true })
export default class Transactions extends Model<TTransactions> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  senderId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  recipientId: number;

  @ForeignKey(() => MusicFiles)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  fileId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.ENUM('sell', 'withdraw'),
    allowNull: false,
  })
  type: TransactionType;

  @Column({
    type: DataType.ENUM('pending', 'finished', 'rejected'),
    allowNull: false,
    defaultValue: 'pending',
  })
  status: TransactionStatus;

  @BelongsTo(() => User, 'senderId')
  sender: User;

  @BelongsTo(() => User, 'recipientId')
  recipient: User;

  @HasOne(() => Sales)
  sale: Sales;

  @BelongsTo(() => MusicFiles)
  musicFile: MusicFiles;
}
