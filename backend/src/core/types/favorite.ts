import { TFile } from './file';
import { TUser } from './user';

export type TMusicsFavorites = {
  userId: number;
  musicId: number;
  user?: TUser;
  musicFile?: TFile;
};
