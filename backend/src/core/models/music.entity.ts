import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';

import Category from './category.entity';
import MusicsComments from './comments.entity';
import MusicsFavorites from './favorites.entity';
import MusicsHistory from './history.entity';
import { Playlist, PlaylistMusic } from './index';
import Instrument from './instrument.entity';
import Key from './key.entity';
import Mood from './mood.entity';
import MusicCategories from './musicCategories.entity';
import MusicFiles from './musicFiles.entity';
import MusicIntruments from './musicInstruments.entity';
import MusicKeys from './musicKeys.entity';
import MusicMoods from './musicMoods.entity';
import MusicTypes from './musicTypes.entity';
import PlaylistFollow from './playlistFollow.entity';
import TrackType from './trackType.entity';
import User from './user.entity';
import { MusicStatus } from '../enums/musics';
import { TFullMusic, TMusicCreate } from '../types/music';

@Table({ tableName: 'musics', freezeTableName: true })
export default class Music extends Model<TFullMusic, TMusicCreate> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  requirements: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  previewImage: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  previewTrack: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  previewCompressedTrack: string;

  @ForeignKey(() => User)
  artistId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  duration: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  bpm: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  listenCount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  downloadCount: number;

  @Column({
    type: DataType.ENUM(
      'pending',
      'approved',
      'rejected',
      'published',
      'blocked',
    ),
    defaultValue: MusicStatus.PENDING,
  })
  status: MusicStatus;

  @BelongsTo(() => User, { as: 'artist' })
  artist: User;

  @BelongsToMany(() => Category, () => MusicCategories, 'musicId', 'categoryId')
  categories: Array<Category & { MusicCategories: MusicCategories }>;

  @BelongsToMany(() => TrackType, () => MusicTypes, 'musicId', 'typeId')
  types: Array<TrackType & { MusicTypes: MusicTypes }>;

  @BelongsToMany(
    () => Instrument,
    () => MusicIntruments,
    'musicId',
    'instrumentId',
  )
  instruments: Array<Instrument & { MusicIntruments: MusicIntruments }>;

  @BelongsToMany(() => Key, () => MusicKeys, 'musicId', 'keyId')
  keys: Array<Key & { MusicKeys: MusicKeys }>;

  @BelongsToMany(() => Mood, () => MusicMoods, 'musicId', 'moodId')
  moods: Array<Mood & { MusicMoods: MusicMoods }>;

  @BelongsToMany(() => User, () => MusicsComments, 'musicId', 'userId')
  comments: Array<User & { MusicsComments: MusicsComments }>;

  @BelongsToMany(() => Playlist, () => PlaylistMusic, 'musicId', 'playlistId')
  playlists: Array<Playlist & { PlaylistMusic: PlaylistMusic }>;

  @BelongsToMany(
    () => PlaylistFollow,
    () => PlaylistMusic,
    'musicId',
    'playlistId',
  )
  playlistFollows: Array<PlaylistFollow & { PlaylistMusic: PlaylistMusic }>;

  @HasMany(() => MusicsFavorites)
  favorites: MusicsFavorites[];

  @HasMany(() => MusicsHistory)
  history: MusicsHistory[];

  @HasMany(() => MusicFiles)
  files: MusicFiles[];

  // Exclusively for search
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: true,
    defaultValue: null,
  })
  moodIds?: number[];

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: true,
    defaultValue: null,
  })
  instrumentIds?: number[];

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: true,
    defaultValue: null,
  })
  keyIds?: number[];

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: true,
    defaultValue: null,
  })
  typeIds?: number[];

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: true,
    defaultValue: null,
  })
  categoryIds?: number[];
}
