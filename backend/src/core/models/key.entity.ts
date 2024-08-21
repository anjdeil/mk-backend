import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import Music from './music.entity';
import MusicKeys from './musicKeys.entity';
import { TKey } from '../types/key';

@Table({ tableName: 'keys', freezeTableName: true })
export default class Key extends Model<TKey> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Music, () => MusicKeys)
  musics: Array<Music & { MusicKeys: MusicKeys }>;
}
