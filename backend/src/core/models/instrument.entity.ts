import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import Music from './music.entity';
import MusicIntruments from './musicInstruments.entity';
import { TIntstrument } from '../types/instrument';

@Table({ tableName: 'instruments', freezeTableName: true })
export default class Instrument extends Model<TIntstrument> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Music, () => MusicIntruments)
  musics: Array<Music & { MusicIntruments: MusicIntruments }>;
}
