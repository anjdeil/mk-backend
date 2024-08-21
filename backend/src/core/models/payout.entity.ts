import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';

import User from './user.entity';
import { PayoutType } from '../enums/payout';

@Table({ tableName: 'user-payout', freezeTableName: true, timestamps: false })
export default class Payout extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.ENUM(PayoutType.INDIVIDUAL, PayoutType.BUSSINESS),
    allowNull: false,
    defaultValue: PayoutType.INDIVIDUAL,
  })
  type: PayoutType;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  swiftCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  accountNumber: string;

  @BelongsTo(() => User)
  user: User;
}
