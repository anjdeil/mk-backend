import { Column, DataType, Model, Table } from 'sequelize-typescript';

import { TContent } from '../types';

@Table({ tableName: 'content', freezeTableName: true, timestamps: true })
export default class Content extends Model<TContent> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  page: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  index: number;
}
