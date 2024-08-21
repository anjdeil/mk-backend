import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { Instrument } from '../../core/models';
import { InstrumentsRepository } from '../../core/repositories';
import { TIntstrument } from '../../core/types';

@Injectable()
export class InstrumentsService {
  constructor(private readonly instrumentsRepository: InstrumentsRepository) {}

  public async create(instrument: TIntstrument): Promise<Instrument> {
    try {
      return await this.instrumentsRepository.create(instrument);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(
    id: number,
    instrument: TIntstrument,
  ): Promise<Instrument> {
    try {
      return await this.instrumentsRepository.update(id, instrument);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Instrument> {
    try {
      return await this.instrumentsRepository.findOneById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<Instrument[]> {
    try {
      return await this.instrumentsRepository.findAll(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      return await this.instrumentsRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
