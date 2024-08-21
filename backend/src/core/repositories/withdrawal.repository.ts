import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { WITHDRAWAL_REPOSITORY } from '../constants';
import Withdrawal from '../models/withdrawal.entity';
import { TWithdrawal } from '../types/withdrawal';

@Injectable()
export class WithdrawalRepository {
  constructor(
    @Inject(WITHDRAWAL_REPOSITORY)
    private readonly withdrawalRepository: typeof Withdrawal,
  ) {}

  public async create(data: TWithdrawal): Promise<Withdrawal> {
    try {
      return await this.withdrawalRepository.create<Withdrawal>(data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(id, data: Partial<TWithdrawal>): Promise<Withdrawal> {
    try {
      const [, [updatedWithdrawals]] =
        await this.withdrawalRepository.update<Withdrawal>(data, {
          where: { id },
          returning: true,
        });
      return updatedWithdrawals;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Withdrawal> {
    try {
      return await this.withdrawalRepository.findOne<Withdrawal>({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneByUserId(
    userId: number,
    filters: FindOptions = {},
  ): Promise<Withdrawal> {
    try {
      return await this.withdrawalRepository.findOne<Withdrawal>({
        ...filters,
        where: { ...filters?.where, userId },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<Withdrawal[]> {
    try {
      return await this.withdrawalRepository.findAll<Withdrawal>(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.withdrawalRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
