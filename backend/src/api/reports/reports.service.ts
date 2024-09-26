import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { Reports } from '../../core/models';
import { ReportRepository } from '../../core/repositories';
import { TReport } from '../../core/types';

@Injectable()
export class ReportsService
{
  constructor(private readonly reportRepository: ReportRepository) { }

  async createReport(
    data: Omit<TReport, 'userId'>,
    userId: number,
  ): Promise<void>
  {
    try
    {
      return await this.reportRepository.createReport({ ...data, userId });
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(options: FindOptions): Promise<Reports[]>
  {
    try
    {
      return await this.reportRepository.findAll(options);
    } catch (error)
    {
      console.log('errorororoor:', error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number): Promise<Reports>
  {
    try
    {
      return await this.reportRepository.findOne(id);
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, data: Partial<TReport>): Promise<Reports>
  {
    try
    {
      return await this.reportRepository.update(id, data);
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }
}
