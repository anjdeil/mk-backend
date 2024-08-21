import {
  BelongsTo,
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';

import Transactions from './transactions.entity';
import User from './user.entity';
import { TInnerTransactions } from '../types/transaction';

@Table({ tableName: 'innerTransactions', freezeTableName: true })
export default class InnerTransactions extends Model<TInnerTransactions> {
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

  @ForeignKey(() => Transactions)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  parentTransactionId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @BelongsTo(() => User, 'senderId')
  sender: User;

  @BelongsTo(() => Transactions)
  parentTransaction: Transactions;
}
