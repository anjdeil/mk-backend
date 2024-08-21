import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { PAYOUT_REPOSITORY } from '../constants';
import Payout from '../models/payout.entity';
import { TPayout } from '../types/payout';

@Injectable()
export class PayoutRepository {
  constructor(
    @Inject(PAYOUT_REPOSITORY) private readonly payoutRepository: typeof Payout,
  ) {}

  public async create(data: TPayout): Promise<Payout> {
    try {
      return await this.payoutRepository.create<Payout>(data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(userId: number, data: Partial<TPayout>): Promise<Payout> {
    try {
      const [, [updatedData]] = await this.payoutRepository.update<Payout>(
        data,
        {
          where: { userId },
          returning: true,
        },
      );
      return updatedData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(userId: number): Promise<Payout> {
    try {
      return await this.payoutRepository.findOne<Payout>({ where: { userId } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<Payout[]> {
    try {
      return await this.payoutRepository.findAll<Payout>(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
