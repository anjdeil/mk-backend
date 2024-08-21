import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import Mood from './mood.entity';
import Music from './music.entity';

export interface MusicMoodsAttributes {
  musicId: number;
  moodId: number;
}

@Table({ tableName: 'music-moods', freezeTableName: true, timestamps: false })
export default class MusicMoods extends Model<MusicMoods> {
  @ForeignKey(() => Music)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  musicId: number;

  @ForeignKey(() => Mood)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  moodId: number;
}
