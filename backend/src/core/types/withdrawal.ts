import { TDefaultModel } from './common/model';

export type TWithdrawal = {
  userId: number;
  amount: number;
  transactionId: string;
  bankTransactionId?: string;
} & TDefaultModel;
