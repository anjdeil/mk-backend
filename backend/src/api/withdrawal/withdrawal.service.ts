import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';

import { NotificationMessages } from '../../core/constants/notifications';
import
{
  NotificationType,
  TransactionStatus,
  TransactionType,
} from '../../core/enums';
import { Transactions, User, Withdrawal } from '../../core/models';
import
{
  BillingAddressRepository,
  NotificationsRepository,
  PayoutRepository,
  TransactionsRepository,
  WithdrawalRepository,
} from '../../core/repositories';

@Injectable()
export class WithdrawalService
{
  constructor(
    private readonly withdrawalRepository: WithdrawalRepository,
    private readonly transactionRepository: TransactionsRepository,
    private readonly billingAddressRepository: BillingAddressRepository,
    private readonly payoutRepository: PayoutRepository,
    private readonly notificationRepository: NotificationsRepository,
  ) { }

  public async create(amount: number, userId: number): Promise<Withdrawal>
  {
    try
    {
      const billingAddress = await this.billingAddressRepository.findOneById(
        userId,
      );
      const payout = await this.payoutRepository.findOneById(userId);

      if (!billingAddress)
      {
        throw new BadRequestException('Billing address not found');
      }

      if (!payout)
      {
        throw new BadRequestException('Payout not found');
      }

      const balance = await this.transactionRepository.countBalance(userId);

      if (balance < amount)
      {
        throw new BadRequestException('Insufficient funds');
      }

      const transaction = await this.transactionRepository.create({
        amount: amount,
        senderId: userId,
        recipientId: userId,
        type: TransactionType.WITHDRAWAL,
        status: TransactionStatus.PENDING,
      });
      const widthdrawal = await this.withdrawalRepository.create({
        amount,
        userId,
        transactionId: transaction.id,
      });
      return widthdrawal;
    } catch (error)
    {
      throw new BadRequestException(error.message);
    }
  }

  public async update(
    id: number,
    bankTransactionId: string,
  ): Promise<Withdrawal>
  {
    try
    {
      const widthdrawal = await this.withdrawalRepository.update(id, {
        bankTransactionId,
      });

      await this.transactionRepository.updateStatus(
        widthdrawal.transactionId,
        TransactionStatus.FINISHED,
      );

      return widthdrawal;
    } catch (error)
    {
      throw new BadRequestException(error.message);
    }
  }

  public async changeStatus(
    id: number,
    status: TransactionStatus,
  ): Promise<Withdrawal>
  {
    try
    {
      const withdrawal = await this.withdrawalRepository.findOneById(id);

      if (!withdrawal)
      {
        throw new BadRequestException('Withdrawal not found');
      }

      await this.transactionRepository.updateStatus(
        withdrawal.transactionId,
        status,
      );

      if (status === TransactionStatus.REJECTED)
      {
        await this.notificationRepository.create({
          type: NotificationType.WITHDRAWAL_REJECTED,
          userId: withdrawal.userId,
          message: NotificationMessages.WITHDRAWAL_REJECTED(withdrawal.amount),
          link: `/my-profile-seller-settings`,
        });
      }

      if (status === TransactionStatus.FINISHED)
      {
        await this.notificationRepository.create({
          type: NotificationType.WITHDRAWAL,
          userId: withdrawal.userId,
          message: NotificationMessages.WITHDRAWAL(withdrawal.amount),
          link: `/my-profile-seller-settings`,
        });
      }

      withdrawal.transaction.status = status;
      return withdrawal;
    } catch (error)
    {
      throw new BadRequestException(error.message);
    }
  }

  public async findAll(options: FindOptions): Promise<Withdrawal[]>
  {
    try
    {
      options.include = [
        Transactions,
        { model: User, attributes: ['id', 'name', 'email'] },
      ];
      const widthdrawals = await this.withdrawalRepository.findAll(options);
      return widthdrawals;
    } catch (error)
    {
      throw new BadRequestException(error.message);
    }
  }

  public async findOneByUserId(
    userId: number,
    options: FindOptions,
  ): Promise<Withdrawal>
  {
    try
    {
      const widthdrawal = await this.withdrawalRepository.findOneByUserId(
        userId,
        options,
      );
      return widthdrawal;
    } catch (error)
    {
      throw new BadRequestException(error.message);
    }
  }
}
