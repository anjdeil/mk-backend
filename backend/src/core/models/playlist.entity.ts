import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
  DataType,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';

import Music from './music.entity';
import PlaylistFollow from './playlistFollow.entity';
import PlaylistMusic from './playlistTracks.entity';
import User from './user.entity';
import { TPlaylist } from '../types';

@Table({ tableName: 'playlists', freezeTableName: true })
export default class Playlist extends Model<TPlaylist> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  coverImage: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  public: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(() => Music, () => PlaylistMusic)
  musics: Music[];

  @HasMany(() => PlaylistFollow, { as: 'followers' })
  followers: PlaylistFollow[];
}
