import { TDefaultModel } from './common/model';
import { TUser } from './user';
import { NotificationType } from '../enums/notifications';

export type TNotification = {
  id?: number;
  message: string;
  type: NotificationType;
  read?: boolean;
  userId: number;
  user?: TUser;
  link?: string;
} & TDefaultModel;
