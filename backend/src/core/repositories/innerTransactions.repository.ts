import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { MusicsFilesRepository } from './files.repository';
import { TransactionsRepository } from './transactions.repository';
import { INNER_TRANSACTIONS_REPOSITORY } from '../constants';
import InnerTransactions from '../models/innerTransactions.entity';
import MusicFiles from '../models/musicFiles.entity';
import Sales from '../models/sales.entity';
import { TInnerTransactions } from '../types/transaction';

@Injectable()
export class InnerTransactionsRepository {
  constructor(
    @Inject(INNER_TRANSACTIONS_REPOSITORY)
    private readonly innerTransactionsRepository: typeof InnerTransactions,
    private readonly filesRepository: MusicsFilesRepository,
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  public async create(
    transaction: TInnerTransactions,
  ): Promise<InnerTransactions> {
    try {
      return await this.innerTransactionsRepository.create<InnerTransactions>(
        transaction,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async bulkCreate(
    transactions: TInnerTransactions[],
  ): Promise<InnerTransactions[]> {
    try {
      return await this.innerTransactionsRepository.bulkCreate<InnerTransactions>(
        transactions,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async createFromTransactions(transactionIds) {
    try {
      const transactions = await this.transactionsRepository.findAll({
        where: {
          id: transactionIds,
        },
        include: [
          {
            model: Sales,
            include: [MusicFiles],
          },
        ],
      });

      const data = transactions.map((item) => ({
        parentTransactionId: item.id,
        amount: item.sale.file.cost - item.amount,
        senderId: item.senderId,
      }));

      await this.bulkCreate(data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
