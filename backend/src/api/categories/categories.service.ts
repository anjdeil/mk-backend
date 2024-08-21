import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { Category } from '../../core/models';
import { CategoriesRepository } from '../../core/repositories';
import { TCategory } from '../../core/types';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async create(category: TCategory): Promise<Category> {
    try {
      return await this.categoriesRepository.create(category);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(id: number, category: TCategory): Promise<Category> {
    try {
      return await this.categoriesRepository.update(id, category);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Category> {
    try {
      return await this.categoriesRepository.findOneById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<Category[]> {
    try {
      return await this.categoriesRepository.findAll(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      return await this.categoriesRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
