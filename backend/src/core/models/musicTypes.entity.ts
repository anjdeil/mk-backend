import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import Music from './music.entity';
import TrackType from './trackType.entity';

export interface MusicTypesAttributes {
  musicId: number;
  typeId: number;
}

@Table({ tableName: 'music-types', freezeTableName: true, timestamps: false })
export default class MusicTypes extends Model<MusicTypes> {
  @ForeignKey(() => Music)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  musicId: number;

  @ForeignKey(() => TrackType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  typeId: number;
}
