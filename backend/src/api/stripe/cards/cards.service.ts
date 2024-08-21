import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Stripe from 'stripe';

import { StripeError } from '../../../core/enums';

@Injectable()
export class CardsService {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
    });
  }

  public async deleteCreditCard(
    cardId: string,
  ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    try {
      return await this.stripe.paymentMethods.detach(cardId);
    } catch (error) {
      if (error?.type === StripeError.InvalidRequest) {
        throw new BadRequestException('Wrong card details');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  public async setDefaultCreditCard(
    paymentMethodId: string,
    customerId: string,
  ): Promise<Stripe.Response<Stripe.Customer>> {
    try {
      return await this.stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    } catch (error) {
      if (error?.type === StripeError.InvalidRequest) {
        throw new BadRequestException('Wrong credit card chosen');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  public async attachCreditCard(
    paymentMethodId: string,
    customerId: string,
  ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    try {
      return await this.stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async listCreditCards(
    customerId: string,
  ): Promise<Stripe.ApiList<Stripe.PaymentMethod>> {
    try {
      return this.stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
