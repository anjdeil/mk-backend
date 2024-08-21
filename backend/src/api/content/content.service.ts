import { Injectable } from '@nestjs/common';

import {
  ContentRepository,
  MediaContentRepository,
} from '../../core/repositories';

@Injectable()
export class ContentService {
  constructor(
    private readonly contentRepository: ContentRepository,
    private readonly mediaContentRepository: MediaContentRepository,
  ) {}

  public async get(options): Promise<any> {
    return await this.contentRepository.get(options);
  }

  public async getById(id: number): Promise<any> {
    return await this.contentRepository.getById(id);
  }

  public async getMediaContent(options): Promise<any> {
    return await this.mediaContentRepository.get(options);
  }

  public async getMediaContentById(id: number): Promise<any> {
    return await this.mediaContentRepository.getById(id);
  }
}
