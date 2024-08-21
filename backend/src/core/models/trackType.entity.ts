import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import Music from './music.entity';
import MusicTypes from './musicTypes.entity';
import { TType } from '../types/type';

@Table({ tableName: 'types', freezeTableName: true })
export default class TrackType extends Model<TType> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Music, () => MusicTypes)
  musics: Array<Music & { MusicTypes: MusicTypes }>;
}
