import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { Transactions } from '../../core/models';
import { TransactionsRepository } from '../../core/repositories';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  public async getAllUserTransactions(userId: number): Promise<Transactions[]> {
    try {
      return await this.transactionsRepository.findAllByUserId(userId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
