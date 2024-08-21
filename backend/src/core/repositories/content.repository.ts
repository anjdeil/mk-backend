import { Inject, Injectable } from '@nestjs/common';

import { CONTENT_REPOSITORY } from '../constants';
import Content from '../models/content.entity';

@Injectable()
export class ContentRepository {
  constructor(
    @Inject(CONTENT_REPOSITORY)
    private readonly contentRepository: typeof Content,
  ) {}

  public async getAll(): Promise<Content[]> {
    try {
      return await this.contentRepository.findAll<Content>();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async get(options): Promise<Content[]> {
    try {
      return await this.contentRepository.findAll<Content>(options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getById(id: number): Promise<Content> {
    try {
      return await this.contentRepository.findByPk<Content>(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
