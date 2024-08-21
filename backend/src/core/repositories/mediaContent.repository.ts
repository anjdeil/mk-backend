import { Inject, Injectable } from '@nestjs/common';

import { MEDIA_CONTENT_REPOSITORY } from '../constants';
import { MediaContent } from '../models';

@Injectable()
export class MediaContentRepository {
  constructor(
    @Inject(MEDIA_CONTENT_REPOSITORY)
    private readonly contentRepository: typeof MediaContent,
  ) {}

  public async get(options): Promise<MediaContent[]> {
    try {
      return await this.contentRepository.findAll<MediaContent>(options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getById(id: number): Promise<MediaContent> {
    try {
      return await this.contentRepository.findByPk<MediaContent>(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
