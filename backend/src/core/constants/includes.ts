import Category from '../models/category.entity';
import MusicsFavorites from '../models/favorites.entity';
import MusicsHistory from '../models/history.entity';
import Instrument from '../models/instrument.entity';
import Key from '../models/key.entity';
import Mood from '../models/mood.entity';
import MusicFiles from '../models/musicFiles.entity';
import Sales from '../models/sales.entity';
import TrackType from '../models/trackType.entity';
import User from '../models/user.entity';

export const musicInclude = [
  {
    model: User,
    attributes: ['id', 'name', 'pseudonym', 'avatar'],
    as: 'artist',
  },
  TrackType,
  Category,
  Instrument,
  Key,
  Mood,
  {
    model: MusicFiles,
    as: 'files',
    attributes: ['id', 'cost', 'type'],
    include: [Sales],
  },
  { model: MusicsFavorites, attributes: ['userId'] },
  { model: MusicsHistory, attributes: ['userId'] },
];

export const musicForPlaylistsInclude = [
  {
    model: User,
    attributes: ['id', 'name', 'pseudonym', 'avatar'],
    as: 'artist',
    required: true,
  },
  {
    model: MusicFiles,
    as: 'files',
    attributes: ['id', 'cost', 'type'],
    required: true,
  },
];
