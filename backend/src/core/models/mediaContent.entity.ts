import { Table, Column, Model, DataType } from 'sequelize-typescript';

import { TContent } from '../types';

@Table({ tableName: 'mediaContent', freezeTableName: true, timestamps: true })
export default class MediaContent extends Model<TContent> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  page: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  link: number;
}
