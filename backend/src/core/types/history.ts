import { TDefaultModel } from './common/model';
import { TFile } from './file';
import { TUser } from './user';

export type THistory = {
  userId: number;
  musicId: number;
  user?: TUser;
  musicFile?: TFile;
} & TDefaultModel;

export type TProcessedHistory = {
  id: number;
  title: string;
  previewImage: string;
  previewTrack: string;
  artistName: string;
  artistId: number;
  createdAt: Date;
  updatedAt: Date;
};
