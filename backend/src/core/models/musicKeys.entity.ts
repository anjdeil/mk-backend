import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import Key from './key.entity';
import Music from './music.entity';

export interface MusicKeysAttributes {
  musicId: number;
  keyId: number;
}

@Table({ tableName: 'music-keys', freezeTableName: true, timestamps: false })
export default class MusicKeys extends Model<MusicKeys> {
  @ForeignKey(() => Music)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  musicId: number;

  @ForeignKey(() => Key)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  keyId: number;
}
