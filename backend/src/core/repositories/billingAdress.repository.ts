import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { BILLING_ADDRESS_REPOSITORY } from '../constants';
import BillingAddress from '../models/billingAddress.entity';
import { TBillingAddress } from '../types/billingAddress';

@Injectable()
export class BillingAddressRepository {
  constructor(
    @Inject(BILLING_ADDRESS_REPOSITORY)
    private readonly billingAddressRepository: typeof BillingAddress,
  ) {}

  public async create(data: TBillingAddress): Promise<BillingAddress> {
    try {
      return await this.billingAddressRepository.create<BillingAddress>(data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(
    userId: number,
    data: Partial<TBillingAddress>,
  ): Promise<BillingAddress> {
    try {
      const [, [updatedData]] =
        await this.billingAddressRepository.update<BillingAddress>(data, {
          where: { userId },
          returning: true,
        });
      return updatedData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(userId: number): Promise<BillingAddress> {
    try {
      return await this.billingAddressRepository.findOne<BillingAddress>({
        where: { userId },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<BillingAddress[]> {
    try {
      return await this.billingAddressRepository.findAll<BillingAddress>(
        filters,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(userId: number): Promise<number> {
    try {
      return await this.billingAddressRepository.destroy({ where: { userId } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
