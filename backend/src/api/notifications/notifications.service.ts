import { Injectable } from '@nestjs/common';

import { Notifications } from '../../core/models';
import { NotificationsRepository } from '../../core/repositories';
import { TNotification } from '../../core/types';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  public async setReadForAllNotifications(
    userId: number,
  ): Promise<Notifications[]> {
    return await this.notificationsRepository.setReadForAllNotifications(
      userId,
    );
  }

  public async setReadForNotifications(
    userId: number,
    id: number | number[],
  ): Promise<Notifications[]> {
    return await this.notificationsRepository.setReadForNotificationsById(
      userId,
      id,
    );
  }

  public async findAllByUser(userId: number): Promise<Notifications[]> {
    return await this.notificationsRepository.findAllByUser(userId);
  }

  public async findAllUnreadByUser(userId: number): Promise<Notifications[]> {
    return await this.notificationsRepository.findAllUnreadByUser(userId);
  }

  public async createNotification(data: TNotification): Promise<void> {
    return await this.notificationsRepository.create(data);
  }
}
