import { TDefaultModel } from './common/model';
import { TMusic } from './music';
import { TSales } from './sales';
import { TUser } from './user';
import { MusicExtension } from '../enums/files';
import Sales from '../models/sales.entity';

export type TFile = {
  title: string;
  url: string;
  type?: MusicExtension;
  cost: number;
  musicId: number;
  userId: number;
  user?: TUser;
  music?: TMusic;
  sales?: TSales[] | Sales[];
} & TDefaultModel;
