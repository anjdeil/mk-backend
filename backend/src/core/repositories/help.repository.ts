import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { HELP_REQUEST_REPOSITORY } from '../constants';
import HelpRequest from '../models/help.entity';
import { THelp } from '../types/help';

@Injectable()
export class HelpRequestRepository {
  constructor(
    @Inject(HELP_REQUEST_REPOSITORY)
    private readonly helpRequestRepository: typeof HelpRequest,
  ) {}

  public async createHelpRequest(data: THelp): Promise<HelpRequest> {
    try {
      return await this.helpRequestRepository.create<HelpRequest>(data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findHelpRequestById(id: number): Promise<HelpRequest> {
    try {
      return await this.helpRequestRepository.findByPk<HelpRequest>(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAllHelpRequests(
    filters: FindOptions = {},
  ): Promise<HelpRequest[]> {
    try {
      return await this.helpRequestRepository.findAll<HelpRequest>(filters);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
