import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import Stripe from 'stripe';

import { StripeError, StripeSubscriptionPlan } from '../../../core/enums';
import { TUser } from '../../../core/types';

@Injectable()
export class SubscriptionsService {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
    });
  }

  public async createSubscription(
    customerId: string,
    price: StripeSubscriptionPlan,
  ): Promise<{ subscriptionId: string; clientSecret: string }> {
    try {
      const subscriptions = await this.listSubscriptions(customerId);

      if (
        subscriptions.data.length &&
        subscriptions.data[0].status === 'active'
      ) {
        throw new BadRequestException('Customer already subscribed');
      }

      const subscriptionParams: Stripe.SubscriptionCreateParams = {
        customer: customerId,
        items: [
          {
            price,
          },
        ],

        expand: ['latest_invoice.payment_intent'],
      };

      const customer = (await this.stripe.customers.retrieve(
        customerId,
      )) as Stripe.Customer;

      if (!customer.invoice_settings?.default_payment_method) {
        subscriptionParams.payment_behavior = 'default_incomplete';
        subscriptionParams.payment_settings = {
          save_default_payment_method: 'on_subscription',
        };
      }

      const subscription = await this.stripe.subscriptions.create(
        subscriptionParams,
      );
      return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        subscriptionId: subscription.id,
      };
    } catch (error) {
      if (error?.code === StripeError.ResourceMissing) {
        throw new BadRequestException('Credit card not set up');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  public async cancelSubscription(customerId: string): Promise<boolean> {
    try {
      const subscriptions = await this.listSubscriptions(customerId);

      if (!subscriptions.data.length) {
        throw new BadRequestException('Customer not subscribed');
      }

      const subscription = subscriptions.data[0];

      if (!subscription) {
        throw new NotFoundException('Subscription not found');
      }

      await this.stripe.subscriptions.cancel(subscription.id);

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updateSubscription(
    customerId: string,
    price: StripeSubscriptionPlan,
  ): Promise<boolean> {
    try {
      const subscriptions = await this.listSubscriptions(customerId);

      if (!subscriptions.data.length) {
        throw new BadRequestException('Customer not subscribed');
      }

      const subscription = subscriptions.data[0];

      if (!subscription) {
        throw new NotFoundException('Subscription not found');
      }

      await this.stripe.subscriptions.update(subscription.id, {
        items: [
          {
            id: subscription.items.data[0].id,
            price,
          },
        ],
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async updatePaymentMethod(
    user: TUser,
    paymentMethodId: string,
  ): Promise<void> {
    try {
      const subscription = await this.getSubscription(user.stripeId);
      await this.stripe.subscriptions.update(subscription.id, {
        default_payment_method: paymentMethodId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async listPrices(): Promise<Stripe.ApiList<Stripe.Price>> {
    try {
      return this.stripe.prices.list();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getSubscription(
    customerId: string,
  ): Promise<Stripe.Subscription> {
    try {
      const subscriptions = await this.listSubscriptions(customerId);
      if (!subscriptions.data.length) {
        return null;
      }

      return subscriptions.data[0];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async listSubscriptions(
    customerId: string,
  ): Promise<Stripe.ApiList<Stripe.Subscription>> {
    try {
      return this.stripe.subscriptions.list({
        customer: customerId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
