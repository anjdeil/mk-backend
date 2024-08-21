import Stripe from 'stripe';

export type TClientSecret = {
  clientSecret: string;
  paymentIntentId: string;
};

export interface SalesData {
  transactionId: string;
  fileId: number;
  userId: number;
}

export interface PaymentConfirmationResponse {
  paymentConfirmation: Stripe.PaymentIntent;
  salesData: SalesData[];
}
