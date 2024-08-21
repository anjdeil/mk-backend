import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';

import Instrument from './instrument.entity';
import Music from './music.entity';

export interface MusicIntrumentsAttributes {
  musicId: number;
  instrumentId: number;
}

@Table({
  tableName: 'music-instruments',
  freezeTableName: true,
  timestamps: false,
})
export default class MusicInstruments extends Model<MusicInstruments> {
  @ForeignKey(() => Music)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  musicId: number;

  @ForeignKey(() => Instrument)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  instrumentId: number;
}
