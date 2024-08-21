import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';

import Category from './category.entity';
import Music from './music.entity';

export interface MusicCategoriesAttributes {
  musicId: number;
  categoryId: number;
}

@Table({
  tableName: 'music-categories',
  freezeTableName: true,
  timestamps: false,
})
export default class MusicCategories extends Model<MusicCategories> {
  @ForeignKey(() => Music)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  musicId: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;
}
