import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { Sales } from '../../core/models';
import { SalesRepository } from '../../core/repositories';

@Injectable()
export class SalesService {
  constructor(private readonly salesRepository: SalesRepository) {}

  public async getAllUserOrders(filters: FindOptions): Promise<Sales[]> {
    try {
      return await this.salesRepository.findAll(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
