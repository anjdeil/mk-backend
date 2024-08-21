import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

import Music from './music.entity';
import Playlist from './playlist.entity';
import { TPlaylistMusic } from '../types';

@Table({
  tableName: 'playlist-musics',
})
export default class PlaylistMusic extends Model<TPlaylistMusic> {
  @ForeignKey(() => Playlist)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  playlistId: number;

  @ForeignKey(() => Music)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  musicId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
