import { TDefaultModel } from './common/model';
import { TFile } from './file';
import { TUser } from './user';

export type TSales = {
  userId: number;
  fileId: number;
  transactionId: string;
  file?: TFile;
  artist?: TUser;
} & TDefaultModel;
