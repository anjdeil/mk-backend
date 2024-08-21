import { TDefaultModel } from './common/model';
import { TMusic } from './music';

export type TType = {
  name: string;
  musics?: TMusic[];
} & TDefaultModel;
