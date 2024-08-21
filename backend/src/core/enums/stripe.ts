export enum StripeError {
  InvalidRequest = 'StripeInvalidRequestError',
  ResourceMissing = 'resource_missing',
}

export enum StripeSubscriptionPlan {
  MONTHLY = 'STRIPE_SUBSCRIPTION_MONTHLY_PLAN',
  ANNUAL = 'STRIPE_SUBSCRIPTION_ANNUAL_PLAN',
}

export enum StipeEvents {
  SUBSCRIPTION_CREATED = 'customer.subscription.created',
  SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
  SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
  SUBSCRIPTION_CANCELLED = 'customer.subscription.cancelled',
  SUBSCRIPTION_FAILED = 'customer.subscription.failed',
  PAYMENT_INTENT_SUCCEEDED = 'payment_intent.succeeded',
  PAYMENT_INTENT_FAILED = 'payment_intent.failed',
  INVOICE_PAYMENT_SUCCEEDED = 'invoice.payment_succeeded',
  INVOICE_PAYMENT_FAILED = 'invoice.payment_failed',
}
