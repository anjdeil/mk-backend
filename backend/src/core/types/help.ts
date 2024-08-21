import { TDefaultModel } from './common/model';
import { TFile } from './file';
import { TUser } from './user';

export type THelp = {
    title: string;
    text: string;
    email: string;
} & TDefaultModel;
