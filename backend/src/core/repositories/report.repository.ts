import
  {
    Inject,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { REPORTS_REPOSITORY } from '../constants';
import Reports from '../models/reports.entity';
import { TReport } from '../types/reports';

@Injectable()
export class ReportRepository
{
  constructor(
    @Inject(REPORTS_REPOSITORY)
    private readonly reportRepository: typeof Reports,
  ) { }

  async createReport(data: TReport): Promise<void>
  {
    try
    {
      console.log('WAW', data);
      await this.reportRepository.create(data);
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(options: FindOptions): Promise<Reports[]>
  {
    try
    {
      return await this.reportRepository.findAll({
        ...options,
        include: [{ all: true }],
      });
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number): Promise<Reports>
  {
    try
    {
      return await this.reportRepository.findOne({
        where: { id },
        include: [{ all: true }],
      });
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, data: Partial<TReport>): Promise<Reports>
  {
    try
    {
      const [, [updatedReport]] = await this.reportRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

      return updatedReport;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }
}
