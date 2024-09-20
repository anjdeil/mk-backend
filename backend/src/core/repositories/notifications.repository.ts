import
{
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { SettingsRepository } from './userSettings.repository';
import { EmailService } from '../../shared/services';
import { NOTIFICATION_REPOSITORY } from '../constants';
import { NotificationType } from '../enums/notifications';
import Notifications from '../models/notifications.entity';
import Settings from '../models/userSettings.entity';
import { SocketService } from '../services/socket/socket.service';
import { getNotificationTemplate } from '../templates/notificationTemplate';
import { TNotification } from '../types/notification';
import { TSettingsItem } from '../types/settings';

@Injectable()
export class NotificationsRepository
{
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationsRepository: typeof Notifications,
    private readonly socketService: SocketService,
    private readonly settingsRepository: SettingsRepository,
    private readonly emailService: EmailService,
  ) { }

  public async create(data: TNotification): Promise<void>
  {
    console.log('notification message:', data.message);
    try
    {
      const userSettings = await this.settingsRepository.findOneByUser(
        data.userId,
      );
      const { id } = await this.notificationsRepository.create<Notifications>(
        data,
      );
      const notification = await this.findOneById(id);
      const { email, push } = this.checkIfSettingsAllowNotification(
        userSettings,
        notification,
      );

      if (push)
      {
        this.socketService.sendMessageToClient(
          notification.userId,
          'notification',
          notification,
        );
      }

      if (email)
      {
        await this.emailService.sendEmail(
          notification.user.email,
          getNotificationTemplate({
            message: notification.message,
            name: notification.user.name,
          }),
        );
      }
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async setReadForAllNotifications(
    userId: number,
  ): Promise<Notifications[]>
  {
    try
    {
      await this.notificationsRepository.update(
        { read: true },
        { where: { userId } },
      );
      return await this.findAllByUser(userId);
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async setReadForNotificationsById(
    userId: number,
    id: number | number[],
  ): Promise<Notifications[]>
  {
    try
    {
      await this.notificationsRepository.update(
        { read: true },
        { where: { userId, id } },
      );
      return await this.findAllByUser(userId);
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAllByUser(userId: number): Promise<Notifications[]>
  {
    try
    {
      return await this.notificationsRepository.findAll<Notifications>({
        where: { userId },
        order: [['id', 'DESC']],
      });
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findAllUnreadByUser(userId: number): Promise<Notifications[]>
  {
    try
    {
      return await this.notificationsRepository.findAll<Notifications>({
        where: { userId, read: false },
        order: [['id', 'DESC']],
      });
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async findOneById(id: number): Promise<Notifications>
  {
    try
    {
      return await this.notificationsRepository.findOne<Notifications>({
        where: { id },
        include: ['user'],
      });
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  private checkIfSettingsAllowNotification(
    userSettings: Settings,
    notification,
  ): TSettingsItem
  {
    switch (notification.type)
    {
      case NotificationType.COMMENTED_TO_COMMENT:
        return userSettings.mentions;
      case NotificationType.COMMENTED_TO_MUSIC:
        return userSettings.comments;
      case NotificationType.MUSIC_FAVORITES:
        return userSettings.favorites;
      case NotificationType.MUSIC_BOUGHT:
      case NotificationType.TOP_UP_BALANCE:
        return userSettings.sales;
      case NotificationType.SUBSCRIPTION_EXPIRED:
      case NotificationType.UPGRAFE_ACCOUNT:
      case NotificationType.UPGRAFE_ACCOUNT_PRO:
      case NotificationType.MUSIC_MAX_PUBLISHED:
        return userSettings.subscriptions;
      case NotificationType.MUSIC_APPROVED:
        return userSettings.musicApproved;
      case NotificationType.MUSIC_PUBLISHED:
      case NotificationType.MUSIC_DECLINED:
        return userSettings.system;
      case NotificationType.FOLLOWING_USER_ACTION:
      case NotificationType.NEW_FOLLOWER:
        return userSettings.follows;
      default:
        return { email: false, push: false };
    }
  }
}
