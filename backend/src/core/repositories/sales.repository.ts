import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { SALES_REPOSITORY } from '../constants';
import Sales from '../models/sales.entity';
import { TSales } from '../types/sales';

@Injectable()
export class SalesRepository {
  constructor(
    @Inject(SALES_REPOSITORY) private readonly salesRepository: typeof Sales,
  ) {}

  public async create(data: TSales): Promise<Sales> {
    try {
      return await this.salesRepository.create<Sales>(data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async bulkCreate(data: TSales[]): Promise<Sales[]> {
    try {
      return await this.salesRepository.bulkCreate<Sales>(data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Sales> {
    try {
      return await this.salesRepository.findOne<Sales>({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<Sales[]> {
    try {
      return await this.salesRepository.findAll<Sales>(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOne(fileId: number, userId: number): Promise<Sales> {
    try {
      return await this.salesRepository.findOne({ where: { fileId, userId } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.salesRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
