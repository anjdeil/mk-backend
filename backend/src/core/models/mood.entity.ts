import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import Music from './music.entity';
import MusicMoods from './musicMoods.entity';
import { TMood } from '../types/mood';

@Table({ tableName: 'moods', freezeTableName: true })
export default class Mood extends Model<TMood> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Music, () => MusicMoods)
  musics: Array<Music & { MusicMoods: MusicMoods }>;
}
