import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

import Playlist from './playlist.entity';
import User from './user.entity';

@Table({ tableName: 'playlist_follows', freezeTableName: true })
export default class PlaylistFollow extends Model {
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @ForeignKey(() => Playlist)
  @Column({ allowNull: false })
  playlistId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Playlist, { as: 'playlist' })
  playlist: Playlist;
}
