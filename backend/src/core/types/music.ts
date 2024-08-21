import { TCategory } from './category';
import { TDefaultModel } from './common/model';
import { TMusicsFavorites } from './favorite';
import { TFile } from './file';
import { THistory } from './history';
import { TIntstrument } from './instrument';
import { TKey } from './key';
import { TMood } from './mood';
import { TSales } from './sales';
import { TType } from './type';
import { TUser } from './user';
import { MusicStatus } from '../enums/musics';

export type TMusicRelations = {
  categories?: TCategory[];
  moods?: TMood[];
  keys?: TKey[];
  instruments?: TIntstrument[];
  types?: TType[];
  comments?: TCategory[];
  sales?: TSales[];
  files?: TFile[];
  artist?: TUser;
  favorites?: TMusicsFavorites[];
  history?: THistory[];
};

export type TMusicCreateRelations = {
  categories: number[];
  moods: number[];
  keys: number[];
  instruments: number[];
  types: number[];
};

export type TMusicSearchRelations = {
  categoryIds: number[];
  moodIds: number[];
  keyIds: number[];
  instrumentIds: number[];
  typeIds: number[];
};

export type TMusic = TDefaultModel &
  TMusicSearchRelations & {
    title: string;
    description: string;
    requirements: string;
    artistId?: number;
    previewImage?: string;
    previewTrack?: string;
    previewCompressedTrack?: string;
    duration: number;
    listenCount?: number;
    downloadCount?: number;
    count?: number;
    favoritesCount?: number;
    purchaseCount?: number;
    historyCount?: number;
    status?: MusicStatus;
  };

export type TMusicCreateFiles = {
  previewImage: Express.Multer.File;
  previewTrack: Express.Multer.File;
  mp3: Express.Multer.File;
  wav: Express.Multer.File[];
  stems: Express.Multer.File[];
};

export type TMusicPrices = {
  mp3Price: number;
  wavPrices: number[];
  stemsPrices: number[];
};

export type TFullMusic = TMusic & TMusicRelations;

export type TMusicCreate = TMusic & TMusicCreateRelations & TMusicPrices;

export type TMusicUpdate = TMusic & TMusicCreateRelations;

export type CompressedFile = Pick<
  Express.Multer.File,
  'buffer' | 'mimetype' | 'originalname'
>;

export type CompressResult = {
  details: Pick<TMusic, 'id' | 'title' | 'artistId' | 'previewTrack'>;
  status: 'OK' | 'COMPRESS_ERROR' | 'SAVE_ERROR';
  time: number;
  url?: string;
};
