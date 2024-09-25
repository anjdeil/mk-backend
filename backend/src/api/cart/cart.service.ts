import
{
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Stripe from 'stripe';

import { PaymentType, TransactionType } from '../../core/enums';
import { Sales } from '../../core/models';
import
{
  CartRepository,
  InnerTransactionsRepository,
  MusicsFilesRepository,
  SalesRepository,
  TransactionsRepository,
} from '../../core/repositories';
import { TCart, TClientSecret, TUser } from '../../core/types';

@Injectable()
export class CartService
{
  private readonly stripe: Stripe;

  constructor(
    private readonly cartRepository: CartRepository,
    private readonly musicFilesRepository: MusicsFilesRepository,
    private readonly salesRepository: SalesRepository,
    private readonly transactionsRepository: TransactionsRepository,
    private readonly innerTransactionsRepository: InnerTransactionsRepository,
  )
  {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
    });
  }

  async getUserCart(userId: number): Promise<TCart[]>
  {
    try
    {
      const cart = await this.cartRepository.findAll(userId);
      return cart;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  async addToCart(userId: number, fileId: number): Promise<void>
  {
    try
    {
      const file = await this.musicFilesRepository.findOne(fileId);

      if (!file)
      {
        throw new BadRequestException('File not found');
      }

      if (file.userId === userId)
      {
        throw new BadRequestException('You cannot add your own file to cart');
      }

      const cartItem = await this.cartRepository.findOne({
        where: { userId, fileId },
      });

      if (cartItem)
      {
        throw new BadRequestException('File already in cart');
      }
      this.cartRepository.create({ userId, fileId });

      return;
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteFromCart(fileId: number, userId: number): Promise<number>
  {
    try
    {
      return this.cartRepository.delete(fileId, userId);
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteAllFromCart(userId: number): Promise<number>
  {
    try
    {
      return this.cartRepository.deleteAll(userId);
    } catch (error)
    {
      throw new InternalServerErrorException(error.message);
    }
  }

  async checkout(
    user: TUser,
    paymentType: PaymentType = PaymentType.STRIPE,
    paymentMethodId: string,
  ): Promise<TClientSecret | { sales: Sales[] }>
  {
    const cart = await this.cartRepository.findAll(user.id);
    if (!cart.length)
    {
      throw new BadRequestException('Cart is empty');
    }
    const amount = cart.reduce((acc, item) => acc + item.musicFile.cost, 0);

    if (paymentType === PaymentType.WALLET)
    {
      if (user.balance < amount)
      {
        throw new BadRequestException('Not enough money');
      }

      const transactionsData = cart.map((item) => ({
        senderId: user.id,
        recipientId: item.musicFile.userId,
        amount: item.musicFile.cost,
        type: TransactionType.SALE,
      }));

      const transactions = await this.transactionsRepository.bulkCreate(
        transactionsData,
      );

      const salesData = transactions.map((transaction) => ({
        transactionId: transaction.id,
        fileId: transaction.fileId,
        userId: transaction.recipientId,
      }));

      const sales = await this.salesRepository.bulkCreate(salesData);

      await this.innerTransactionsRepository.bulkCreate(
        transactions.map((item) => ({
          parentTransactionId: item.id,
          amount: Math.floor(item.amount / 9),
          senderId: item.senderId,
        })),
      );

      return { sales };
    } else
    {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        customer: user.stripeId,
        payment_method: paymentMethodId,
        metadata: {
          userId: user.id,
          fileIds: JSON.stringify(cart.map((item) => item.musicFile.id)),
        },
      });
      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    }
  }

  async unauthorizedCheckout(data: {
    fileIds: number[];
    user: { name: string; email: string };
    paymentMethodId: string;
  }): Promise<any>
  {
    const customer = await this.stripe.customers.create({
      name: data.user.name,
      email: data.user.email,
    });
    const files = await this.musicFilesRepository.findAllbyIds(data.fileIds);
    const amount = files.reduce((acc, item) => acc + item.cost, 0);
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customer.id,
      payment_method_types: ['card'],
      payment_method: data.paymentMethodId,
      metadata: {
        customerId: customer.id,
        fileIds: JSON.stringify(data.fileIds),
        user: JSON.stringify(data.user),
      },
    });
    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  }
}
