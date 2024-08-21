import { MusicExtension } from '../enums/files';

export const cartSchema = {
  type: 'object',
  properties: {
    fileId: {
      type: 'number',
      example: 0,
    },
    artistId: {
      type: 'number',
      example: 0,
    },
    previewImage: {
      type: 'string',
      example:
        'https://www.google.com.ua/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    },
    previewTrack: {
      type: 'string',
      example:
        'https://www.google.com.ua/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    },
    cost: {
      type: 'number',
      example: 100,
    },
    artistName: {
      type: 'string',
      example: 'artistName',
    },
    fileType: {
      type: 'enum',
      enum: [MusicExtension.MP3, MusicExtension.WAV],
      example: MusicExtension.MP3,
    },
  },
  additionalProperties: false,
};

export const createCartSchema = {
  type: 'object',
  properties: {
    fileId: {
      type: 'number',
      example: 0,
    },
  },
  additionalProperties: false,
};
