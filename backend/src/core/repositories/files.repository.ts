import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { MUSIC_FILES_REPOSITORY } from '../constants';
import MusicFiles from '../models/musicFiles.entity';
import { TFile } from '../types/file';

@Injectable()
export class MusicsFilesRepository {
  constructor(
    @Inject(MUSIC_FILES_REPOSITORY)
    private readonly filesRepository: typeof MusicFiles,
  ) {}

  public async create(data: TFile): Promise<MusicFiles> {
    try {
      return await this.filesRepository.create<MusicFiles>(data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(id: number, data: TFile): Promise<MusicFiles> {
    try {
      const files = await this.filesRepository.update<MusicFiles>(data, {
        where: { id },
        returning: true,
      })[1][0];
      return files;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<MusicFiles[]> {
    try {
      return await this.filesRepository.findAll<MusicFiles>(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOne(id: number): Promise<MusicFiles> {
    try {
      return await this.filesRepository.findOne<MusicFiles>({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAllbyIds(ids: number[]): Promise<MusicFiles[]> {
    try {
      return await this.filesRepository.findAll<MusicFiles>({
        where: { id: ids },
        include: [{ all: true }],
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.filesRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async deleteByMusicId(musicId: number): Promise<void> {
    try {
      await this.filesRepository.destroy({ where: { musicId } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
