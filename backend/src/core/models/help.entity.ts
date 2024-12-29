import { Table, Model, Column, DataType } from 'sequelize-typescript';

import { THelp } from '../types/help';

@Table({ tableName: 'help', freezeTableName: true })
export default class HelpRequest extends Model<THelp> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  text: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  email: string;
}
