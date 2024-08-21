import { TTimestamps } from './common/model';
import { TransactionStatus, TransactionType } from '../enums/transactions';

export type TTransactions = TTimestamps & {
  id?: string;
  senderId: number;
  recipientId: number;
  amount: number;
  type: TransactionType;
  fileId?: number;
  status?: TransactionStatus;
};

export type TInnerTransactions = TTimestamps & {
  id?: string;
  senderId: number;
  amount: number;
  parentTransactionId: string;
};
