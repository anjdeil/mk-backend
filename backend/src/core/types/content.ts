import { TDefaultModel } from './common/model';

export type TContent = {
  page: string;
  section: string;
  content: string;
  index: number;
} & TDefaultModel;
