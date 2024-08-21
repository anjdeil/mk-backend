import { TDefaultModel } from './common/model';
import { TUser } from './user';

export type TResetPassword = {
  token: string;
  used: boolean;
  userId: number;
  user?: TUser;
} & TDefaultModel;
