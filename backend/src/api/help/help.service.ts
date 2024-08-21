import { Injectable } from '@nestjs/common';

import HelpRequest from '../../core/models/help.entity';
import { HelpRequestRepository } from '../../core/repositories/help.repository';
import {
  getModerHelpRequestTemplate,
  getUserHelpRequestTemplate,
} from '../../core/templates';
import { THelp } from '../../core/types/help';
import { EmailService } from '../../shared/services';
import {getNotificationTemplate} from "../../core/templates/notificationTemplate";

@Injectable()
export class HelpService {
  constructor(
    private readonly helpRepository: HelpRequestRepository,
    private readonly emailService: EmailService,
  ) {}

  public async createHelpRequest(data: THelp): Promise<HelpRequest> {
    await this.emailService.sendEmail(
      data.email,
      getNotificationTemplate({
        name: data.email,
        message: `Thank you for reaching out to us for assistance. We have received your help request and our team is working on it. You can expect to hear back from us shortly.`,
      }),
    );

    await this.emailService.sendEmail(
      'yana@digiway.dev',
      getModerHelpRequestTemplate(data),
    );

    return await this.helpRepository.createHelpRequest(data);
  }

  public async findHelpRequestById(id: number): Promise<HelpRequest> {
    return await this.helpRepository.findHelpRequestById(id);
  }

  public async findAllHelpRequests(): Promise<HelpRequest[]> {
    return await this.helpRepository.findAllHelpRequests();
  }
}
