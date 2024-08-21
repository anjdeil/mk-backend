import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import Music from './music.entity';
import MusicCategory from './musicCategories.entity';
import { TCategory } from '../types/category';

@Table({ tableName: 'categories', freezeTableName: true })
export default class Category extends Model<TCategory> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Music, () => MusicCategory)
  musics: Array<Music & { MusicCategory: MusicCategory }>;
}
