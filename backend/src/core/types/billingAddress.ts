import { TTimestamps } from './common/model';

export type TBillingAddress = {
  userId: number;
  address: string;
  city: string;
  email: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  phoneCode: string;
} & TTimestamps;
