import
  {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { NotificationMessages } from '../../../core/constants/notifications';
import { BucketType, NotificationType, Roles } from '../../../core/enums';
import { BillingAddress, Payout, User } from '../../../core/models';
import
  {
    NotificationsRepository,
    TransactionsRepository,
    UsersRepository,
  } from '../../../core/repositories';
import { FollowRepository } from '../../../core/repositories/follow.repository';
import { getNotificationTemplate } from '../../../core/templates/notificationTemplate';
import { TUser } from '../../../core/types';
import { EmailService, FileStorageService } from '../../../shared/services';

@Injectable()
export class ProfileService
{
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly transactionsRepository: TransactionsRepository,
    private readonly notificationsRepository: NotificationsRepository,
    private readonly followsRepository: FollowRepository,
    private readonly emailService: EmailService,
  ) { }

  public async getProfile(userId: number): Promise<TUser>
  {
    try
    {
      const user = await this.userRepository.findOneById(userId, {
        attributes: { exclude: ['password'] },
        include: [BillingAddress, Payout],
      });
      if (!user)
      {
        throw new BadRequestException('No such user');
      }
      const balance = await this.transactionsRepository.countBalance(userId);
      const followersCount = await this.followsRepository.countFollowers(
        userId,
      );
      return { ...user['dataValues'], balance, followersCount };
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getBalance(userId: number): Promise<{ balance: number }>
  {
    try
    {
      const balance = await this.transactionsRepository.countBalance(userId);
      return { balance };
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async requestProfileVerification(
    user: TUser,
  ): Promise<{ result: User }>
  {
    try
    {
      if (user.onVerification)
      {
        throw new ForbiddenException('User is already is under verification');
      }

      const result = await this.userRepository.update(user.id, {
        onVerification: true,
      });

      this.emailService.sendEmail(
        'yana@digiway.dev',
        getNotificationTemplate({
          name: 'yana@digiway.dev',
          message: `User: ${user.email} Has requested account verification`,
        }),
      );
      this.emailService.sendEmail(
        user.email,
        getNotificationTemplate({
          name: user.name,
          message: `Your account is now on verification. Our support team will contact with you soon.`,
        }),
      );

      return { result };
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updateProfile(
    user: TUser,
    data: Partial<TUser>,
  ): Promise<{ result: User }>
  {
    try
    {
      let newPass: string | null;
      if (data.password)
      {
        newPass = await bcrypt.hash(data.password, 10);
      }
      delete data.password;
      const result = await this.userRepository.update(user.id, {
        ...data,
        ...(newPass && { password: newPass }),
      });
      if (data.role === Roles.SELLER)
      {
        await this.notificationsRepository.create({
          type: NotificationType.UPGRAFE_ACCOUNT,
          userId: user.id,
          message: NotificationMessages.UPGRAFE_ACCOUNT,
          link: `/my-profile-seller`,
        });
      }
      return { result };
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updateAvatar(
    user: TUser,
    avatar: Express.Multer.File,
  ): Promise<{ result: User }>
  {
    try
    {
      const uploadedFile = await this.fileStorageService.uploadFile(avatar, BucketType.AVATAR, user.id, 'avatar', true);
      const result = await this.userRepository.update(user.id, {
        avatar: uploadedFile,
      });
      return { result };
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async deleteProfile(userId: number): Promise<void>
  {
    try
    {
      await this.userRepository.delete(userId);
      return;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updatePassword(
    userId: number,
    oldPassword: string,
    password: string,
  ): Promise<{ result: User }>
  {
    try
    {
      const user = await this.userRepository.findOneById(userId);
      if (!user)
      {
        throw new BadRequestException('No such user');
      }
      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match)
      {
        throw new BadRequestException('Invalid password');
      }

      const pass = await bcrypt.hash(password, 10);
      const result = await this.userRepository.update(userId, {
        password: pass,
      });

      return { result };
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }
}
