import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';

import Music from './music.entity';
import User from './user.entity';
import { ReportStatus } from '../enums/reports';
import { TReport } from '../types/reports';

@Table({ tableName: 'reports', freezeTableName: true, timestamps: false })
export default class Reports extends Model<TReport> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  report: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  managerId: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  subjectid: number;

  @ForeignKey(() => Music)
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  musicId: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM(ReportStatus.PENDING, ReportStatus.RESOLVED),
    defaultValue: ReportStatus.PENDING,
  })
  status: string;

  @BelongsTo(() => User, { as: 'user', foreignKey: 'userId' })
  user: User;

  @BelongsTo(() => User, { as: 'manager', foreignKey: 'managerId' })
  manager: User;

  @BelongsTo(() => Music, { as: 'music' })
  music: Music;
}
