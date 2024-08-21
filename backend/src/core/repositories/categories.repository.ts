import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { CATEGORY_REPOSITORY } from '../constants';
import Category from '../models/category.entity';
import { TCategory } from '../types/category';

@Injectable()
export class CategoriesRepository {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
  ) {}

  public async create(category: TCategory): Promise<Category> {
    try {
      return await this.categoryRepository.create<Category>(category);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(id: number, category: TCategory): Promise<Category> {
    try {
      const [, [updatedCategory]] =
        await this.categoryRepository.update<Category>(category, {
          where: { id },
          returning: true,
        });
      return updatedCategory;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Category> {
    try {
      return await this.categoryRepository.findOne<Category>({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<Category[]> {
    try {
      return await this.categoryRepository.findAll<Category>(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.categoryRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
