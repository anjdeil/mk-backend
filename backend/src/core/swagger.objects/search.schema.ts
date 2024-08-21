import { ApiProperty } from '@nestjs/swagger';

import { CommonFilterSchema } from './filters.schema';

export enum SearchTarget {
  USERS = 'users',
  MUSICS = 'musics',
  PLAYLISTS = 'playlists',
}

export class SearchSchema<
  TFilters = void,
> extends CommonFilterSchema<TFilters> {
  @ApiProperty({
    required: false,
    example: SearchTarget.MUSICS,
    enum: [SearchTarget.USERS, SearchTarget.MUSICS],
  })
  target?: SearchTarget;

  @ApiProperty({
    required: false,
    example: {
      filters: {
        categories: [1, 2],
        keys: [1, 2],
        instruments: [1, 2],
        types: [1, 2],
        moods: [1, 2],
        bpm: [],
        duration: [],
        cost: [],
        relevance: 'week',
      },
    },
  })
  declare filters?: TFilters;
}

export class SearchSchema2<
  TFilters = void,
> extends CommonFilterSchema<TFilters> {
  @ApiProperty({
    required: false,
    example: SearchTarget.MUSICS,
    enum: [SearchTarget.USERS, SearchTarget.MUSICS],
  })
  target?: SearchTarget;

  @ApiProperty({
    required: false,
    example: {
      filters: {
        categories: [1, 2],
        keys: [1, 2],
        instruments: [1, 2],
        types: [1, 2],
        moods: [1, 2],
        bpm: [],
        duration: [],
        cost: [],
        relevance: 'week',
      },
    },
  })
  declare filters?: TFilters;
}
