import { TTimestamps } from './common/model';
import { PayoutType } from '../enums/payout';

export type TPayout = {
  userId: number;
  type: PayoutType;
  name: string;
  swiftCode: string;
  accountNumber: string;
} & TTimestamps;
