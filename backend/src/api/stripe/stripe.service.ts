import
  {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
import Stripe from 'stripe';

import { NotificationMessages } from '../../core/constants/notifications';
import
  {
    BucketType,
    NotificationType,
    TransactionStatus,
    TransactionType,
  } from '../../core/enums';
import { User } from '../../core/models';
import
  {
    CartRepository,
    MusicsFilesRepository,
    MusicsRepository,
    NotificationsRepository,
    SalesRepository,
    TransactionsRepository,
    UsersRepository,
  } from '../../core/repositories';
import { getSaleTemplate } from '../../core/templates/saleTemplate';
import { getSellerEmailTemplate } from '../../core/templates/sellerEmailTemplate';
import
  {
    PaymentConfirmationResponse,
    TClientSecret,
    TUser,
  } from '../../core/types';
import { EmailService, FileStorageService } from '../../shared/services';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class StripeService
{
  private readonly stripe: Stripe;

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly musicsRepository: MusicsRepository,
    private readonly salesRepository: SalesRepository,
    private readonly cartRepository: CartRepository,
    private readonly transactionRepository: TransactionsRepository,
    private readonly notificationsRepository: NotificationsRepository,
    private readonly filesRepository: MusicsFilesRepository,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private readonly fileStorageService: FileStorageService,
  )
  {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
    });
  }

  public async createCustomer(user: TUser): Promise<User>
  {
    const { id, email, name, stripeId } = user;
    if (stripeId)
    {
      throw new BadRequestException('User already has a stripe account');
    }
    try
    {
      const customer = await this.stripe.customers.create({
        email,
        name,
        metadata: {
          userId: id,
        },
      });
      return await this.usersRepository.update(id, {
        stripeId: customer.id,
      });
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getClientKey(user: TUser): Promise<TClientSecret>
  {
    try
    {
      const options = {
        amount: 0,
        currency: 'usd',
        customer: user.stripeId,
        metadata: {
          userId: user.id,
        },
      };

      const paymentIntent = await this.stripe.paymentIntents.create(options);
      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async createPaymentIntent(
    amount: number,
    user: TUser,
    paymentMethodId: string | null = undefined,
    metadata = {},
  ): Promise<TClientSecret>
  {
    try
    {
      const options = {
        amount: amount,
        currency: 'usd',
        customer: user.stripeId,
        payment_method_types: ['card', 'paypal'],
        metadata: {
          ...metadata,
          userId: user.id,
        },
      };

      if (paymentMethodId)
      {
        options['payment_method'] = paymentMethodId;
      }

      const paymentIntent = await this.stripe.paymentIntents.create(options);
      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async constructEventFromPayload(
    signature: string,
    payload: Buffer,
  ): Promise<Stripe.Event>
  {
    try
    {
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async confirmPayment(
    paymentIntentId: string,
    paymentMethodId?: string,
  ): Promise<PaymentConfirmationResponse>
  {
    try
    {
      const confirmOptions: Stripe.PaymentIntentConfirmParams = {};

      if (paymentMethodId)
      {
        confirmOptions.payment_method = paymentMethodId;
      }

      const paymentConfirmation = await this.stripe.paymentIntents.confirm(
        paymentIntentId,
        confirmOptions,
      );

      if (paymentConfirmation.status === 'succeeded')
      {
        const userId = +paymentConfirmation.metadata.userId;
        await this.musicsRepository.unblockMusicsByUserId(userId);
        const cart = await this.cartRepository.findAll(userId);
        const transactionsData = cart.map((item) => ({
          senderId: userId,
          recipientId: item.musicFile.artist.id,
          amount: item.musicFile.cost,
          type: TransactionType.SALE,
          status: TransactionStatus.FINISHED,
          fileId: item.musicFile.id,
        }));
        const transactions = await this.transactionRepository.bulkCreate(
          transactionsData,
        );
        const salesData = transactions.map((transaction) => ({
          transactionId: transaction.id,
          fileId: transaction.fileId,
          userId: transaction.senderId,
        }));
        await this.salesRepository.bulkCreate(salesData);
        await this.cartRepository.deleteAll(userId);

        return { paymentConfirmation, salesData };
      }
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async handleEvent(event: Stripe.Event): Promise<void>
  {
    try
    {
      switch (event.type)
      {
        case 'customer.subscription.updated': {
          const data = event.data.object as Stripe.Subscription;
          if (data.status === 'active')
          {
            const customerId: string = data.customer as string;
            const subscribedUntil = new Date(data.current_period_end * 1000);
            await this.usersRepository.updateUserSubsription(customerId, {
              subscribedUntil,
              subscriptionPriceId: data.items.data[0].price.id,
            });
            const user = await this.usersRepository.findOneByStripeId(
              customerId,
            );
            console.log('AfterThirdOne :>>', data);
            try
            {
              await this.musicsRepository.unblockMusicsByUserId(+user.id);
            } catch (error)
            {
              console.error('Error unblocking musics:', error);
            }

            console.log('AfterFourthOne :>>', user.id);
            await this.notificationsRepository.create({
              type: NotificationType.UPGRAFE_ACCOUNT_PRO,
              userId: +user.id,
              message: getSellerEmailTemplate(user.name),
              link: `/my-profile-seller`,
            });
          }
          return;
        }
        case 'customer.subscription.deleted':
        case 'customer.subscription.cancelled':
          {
            const data = event.data.object as Stripe.Subscription;
            const customerId: string = data.customer as string;
            const user = await this.usersRepository.findOneByStripeId(
              customerId,
            );
            await this.musicsRepository.blockMusicsByUserId(user.id);
          }
          break;
        case 'customer.subscription.failed':
          {
            const data = event.data.object as Stripe.Subscription;
            await this.musicsRepository.blockMusicsByUserId(
              +data.metadata.userId,
            );
            await this.notificationsRepository.create({
              type: NotificationType.SUBSCRIPTION_EXPIRED,
              userId: +data.metadata.userId,
              message: NotificationMessages.SUBSCRIPTION_EXPIRED,
              link: `/buy-subscription`,
            });
          }
          break;
        case 'charge.succeeded':
          {
            try
            {
              const data = event.data.object as Stripe.PaymentIntent;
              let user;
              let isUnAuthFlow = false;
              if (data.metadata.user)
              {
                isUnAuthFlow = true;
                user = await this.authService.createWithoutPassword({
                  ...JSON.parse(data.metadata.user),
                  stripeId: data.metadata.customerId,
                });
              } else
              {
                user = await this.usersRepository.findOneById(
                  +data.metadata.userId,
                );
              }
              const files = await this.filesRepository.findAllbyIds(
                JSON.parse(data.metadata.fileIds),
              );

              const transactionsData = files.map((item) => ({
                senderId: user.id,
                recipientId: item.userId,
                amount: item.cost,
                type: TransactionType.SALE,
                status: TransactionStatus.FINISHED,
                fileId: item.id,
              }));

              const transactions = await this.transactionRepository.bulkCreate(
                transactionsData,
              );

              const salesData = transactions.map((transaction) => ({
                transactionId: transaction.id,
                fileId: transaction.fileId,
                userId: transaction.senderId,
              }));

              await this.salesRepository.bulkCreate(salesData);

              const promises = files.map(async (item) =>
              {
                const itemPath = this.fileStorageService.getFilePath(item);
                const linkUrl = await this.fileStorageService.getFile(
                  BucketType.MUSIC,
                  itemPath,
                );
                return {
                  linkUrl,
                  title: item.title,
                  type: item.type,
                };
              });
              const links = await Promise.all(promises);

              this.emailService.sendEmail(
                user.email,
                getSaleTemplate({ name: user.name, links }),
              );

              if (!isUnAuthFlow)
              {
                await this.cartRepository.deleteAllByFileIds(
                  user.id,
                  JSON.parse(data.metadata.fileIds),
                );
              }

              const notificationsData = files.map((item) =>
              {
                return this.notificationsRepository.create({
                  userId: item.userId,
                  type: NotificationType.MUSIC_BOUGHT,
                  message: NotificationMessages.MUSIC_BOUGHT(
                    item.music.title,
                    user.name,
                  ),
                  link: `/music/${item.music.id}`,
                });
              });

              await Promise.all(notificationsData);
            } catch (e)
            {
              console.log('e :>> ', e);
            }
          }
          break;
        default:
          return;
      }
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }
}
