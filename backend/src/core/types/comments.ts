import { TDefaultModel } from './common/model';
import { TFile } from './file';
import { TUser } from './user';

export type TMusicsComments = {
  comment: string;
  musicId: number;
  userId: number;
  parentCommentId?: number;
} & TDefaultModel;

export type TMusicsCommentsFull = TMusicsComments & {
  user?: TUser;
  musicFile?: TFile;
};
