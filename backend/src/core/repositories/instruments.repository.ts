import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { INSTRUMENTS_REPOSITORY } from '../constants';
import Instrument from '../models/instrument.entity';
import { TIntstrument } from '../types/instrument';

@Injectable()
export class InstrumentsRepository {
  constructor(
    @Inject(INSTRUMENTS_REPOSITORY)
    private readonly instrumentRepository: typeof Instrument,
  ) {}

  public async create(instrument: TIntstrument): Promise<Instrument> {
    try {
      return await this.instrumentRepository.create<Instrument>(instrument);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(id, instrument: TIntstrument): Promise<Instrument> {
    try {
      const [, [updatedInstrument]] =
        await this.instrumentRepository.update<Instrument>(instrument, {
          where: { id },
          returning: true,
        });
      return updatedInstrument;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Instrument> {
    try {
      return await this.instrumentRepository.findOne<Instrument>({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAll(filters: FindOptions): Promise<Instrument[]> {
    try {
      return await this.instrumentRepository.findAll<Instrument>(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.instrumentRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
