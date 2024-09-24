import
  {
    Inject,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
import { FindOptions, Op } from 'sequelize';

import { TRANSACTION_REPOSITORY } from '../constants';
import { TransactionStatus, TransactionType } from '../enums/transactions';
import Transactions from '../models/transactions.entity';
import { TTransactions } from '../types/transaction';

@Injectable()
export class TransactionsRepository
{
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: typeof Transactions,
  ) { }

  public async create(transaction: TTransactions): Promise<Transactions>
  {
    try
    {
      return await this.transactionRepository.create<Transactions>(transaction);
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: string): Promise<Transactions>
  {
    try
    {
      return await this.transactionRepository.findOne<Transactions>({
        where: { id },
      });
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async bulkCreate(data: TTransactions[]): Promise<Transactions[]>
  {
    try
    {
      console.log('Checkout data test:', data);
      return await this.transactionRepository.bulkCreate<Transactions>(data);
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<Transactions[]>
  {
    try
    {
      return await this.transactionRepository.findAll<Transactions>(filters);
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAllByUserId(userId: number): Promise<Transactions[]>
  {
    try
    {
      return await this.transactionRepository.findAll<Transactions>({
        where: {
          [Op.or]: [{ recipientId: userId }],
        },
      });
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async countBalance(userId: number): Promise<number>
  {
    try
    {
      const transactions =
        await this.transactionRepository.findAll<Transactions>({
          where: {
            recipientId: userId,
            [Op.not]: [{ status: TransactionStatus.REJECTED }],
          },
        });
      const balance = transactions.reduce((acc, transaction) =>
      {
        if (transaction.type === TransactionType.SALE)
        {
          return acc + transaction.amount;
        }
        return acc - transaction.amount;
      }, 0);
      return balance ?? 0;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updateStatus(id: string, status: TransactionStatus)
  {
    try
    {
      const [, [updatedTransaction]] =
        await this.transactionRepository.update<Transactions>(
          { status },
          {
            where: { id },
            returning: true,
          },
        );
      return updatedTransaction;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }
}
