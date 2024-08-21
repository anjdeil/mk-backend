import { TBillingAddress } from './billingAddress';
import { TCart } from './cart';
import { TDefaultModel } from './common/model';
import { TMusic } from './music';
import { TPayout } from './payout';
import { Roles } from '../enums';

export type TUser = {
  name: string;
  email: string;
  confirmed?: boolean;
  role?: Roles;
  pseudonym?: string;
  biography?: string;
  avatar?: string;
  phone?: string;
  password?: string;
  stripeId?: string;
  onVerification?: boolean;
  subscribedUntil?: Date;
  cart?: TCart[];
  billingAddress?: TBillingAddress;
  payout?: TPayout;
  musics?: TMusic[];
  followersCount?: number;
  balance?: number;
  subscriptionPriceId?: string;
} & TDefaultModel;

export type TArtist = Pick<TUser, 'name' | 'pseudonym' | 'id' | 'avatar'>;
