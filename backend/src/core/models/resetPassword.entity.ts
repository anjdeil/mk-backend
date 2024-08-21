import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import User from './user.entity';
import { TResetPassword } from '../types/resetPassword';

@Table({ tableName: 'reset-password', freezeTableName: true })
export default class ResetPassword extends Model<TResetPassword> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  used: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
