import { TDefaultModel } from './common/model';
import { TUser } from './user';

export type TSettingsItem = {
  email: boolean;
  push: boolean;
};

export type TSettings = {
  userId: number;
  user?: TUser;
  comments: TSettingsItem;
  mentions: TSettingsItem;
  favorites: TSettingsItem;
  promotions: TSettingsItem;
  subscriptions: TSettingsItem;
  withdrawal: TSettingsItem;
  sales: TSettingsItem;
  system: TSettingsItem;
} & TDefaultModel;
