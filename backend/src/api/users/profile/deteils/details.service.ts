import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { BillingAddress, Payout } from '../../../../core/models';
import {
  BillingAddressRepository,
  PayoutRepository,
} from '../../../../core/repositories';
import { TBillingAddress, TPayout } from '../../../../core/types';

@Injectable()
export class DetailsService {
  constructor(
    private readonly billingAddressRepository: BillingAddressRepository,
    private readonly payoutRepository: PayoutRepository,
  ) {}

  public async createBillingAddress(
    data: Omit<TBillingAddress, 'userId'>,
    userId: number,
  ): Promise<BillingAddress> {
    try {
      return await this.billingAddressRepository.create({
        ...data,
        userId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getBillingAddress(userId: number): Promise<BillingAddress> {
    try {
      return await this.billingAddressRepository.findOneById(userId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updateBillingAddress(
    data: Partial<TBillingAddress>,
    userId: number,
  ): Promise<BillingAddress> {
    try {
      return await this.billingAddressRepository.update(userId, data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async createPayout(
    data: Omit<TPayout, 'userId'>,
    userId: number,
  ): Promise<Payout> {
    try {
      return await this.payoutRepository.create({ ...data, userId });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getPayout(userId: number): Promise<Payout> {
    try {
      return await this.payoutRepository.findOneById(userId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updatePayout(
    data: Partial<TPayout>,
    userId: number,
  ): Promise<Payout> {
    try {
      return await this.payoutRepository.update(userId, data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
