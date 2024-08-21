export const typesGroupBy = [
  'types.id',
  'types.MusicTypes.musicId',
  'types.MusicTypes.typeId',
];

export const moodsGroupBy = [
  'moods.id',
  'moods.MusicMoods.musicId',
  'moods.MusicMoods.moodId',
];

export const keysGroupBy = [
  'keys.id',
  'keys.MusicKeys.musicId',
  'keys.MusicKeys.keyId',
];

export const instrumentsGroupBy = [
  'instruments.id',
  'instruments.MusicInstruments.musicId',
  'instruments.MusicInstruments.instrumentId',
];

export const categoriesGroupBy = [
  'categories.id',
  'categories.MusicCategories.musicId',
  'categories.MusicCategories.categoryId',
];

export const historyGroupBy = [
  'history.userId',
  'history.musicId',
  'history.createdAt',
  'history.updatedAt',
];

export const musicGroupBy = ['Music.id', 'artist.id', 'files.id'];

export const fullMusicGroupBy = musicGroupBy.concat(
  typesGroupBy,
  moodsGroupBy,
  keysGroupBy,
  instrumentsGroupBy,
  categoriesGroupBy,
  historyGroupBy,
);

export const userGroupBy = ['User.id', 'musics.id', 'musics.files.id'];

export const fullUserGroupBy = userGroupBy.concat(
  typesGroupBy.map((item) => 'musics.' + item),
  moodsGroupBy.map((item) => 'musics.' + item),
  keysGroupBy.map((item) => 'musics.' + item),
  instrumentsGroupBy.map((item) => 'musics.' + item),
  categoriesGroupBy.map((item) => 'musics.' + item),
  historyGroupBy.map((item) => 'musics.' + item),
);
