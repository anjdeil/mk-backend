import {
  Table,
  ForeignKey,
  Model,
  BelongsTo,
  Column,
  DataType,
} from 'sequelize-typescript';

import Transactions from './transactions.entity';
import User from './user.entity';
import { TWithdrawal } from '../types/withdrawal';

@Table({ tableName: 'withdrawal-requests', freezeTableName: true })
export default class Withdrawal extends Model<TWithdrawal> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bankTransactionId: string;

  @ForeignKey(() => Transactions)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  transactionId: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Transactions)
  transaction: Transactions;
}
