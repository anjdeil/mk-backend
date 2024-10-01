import
  {
    BadRequestException,
    Body,
    Controller,
    Headers,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import
  {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
import Stripe from 'stripe';

import { StripeService } from './stripe.service';
import { AllowedRoles } from '../../core/decorators';
import { Roles } from '../../core/enums';
import { RolesGuard } from '../../core/guards';
import { AuthRequest } from '../../core/types/common';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController
{
  constructor(private readonly stripeService: StripeService) { }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create customer' })
  @ApiResponse({ status: 200, description: 'Customer created successfully' })
  @AllowedRoles(Roles.SELLER, Roles.BUYER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('create-customer')
  public async createCustomer(@Req() req: AuthRequest)
  {
    return await this.stripeService.createCustomer(req.user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Payment Confirmation' })
  @ApiResponse({ status: 200, description: 'Purchase successfully' })
  @AllowedRoles(Roles.SELLER, Roles.BUYER)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        paymentMethodId: {
          type: 'string',
        },
        paymentIntent: {
          type: 'string',
        },
      },
    },
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('payment-confirm')
  public async confirmPayment(@Req() req: AuthRequest)
  {
    return await this.stripeService.confirmPayment(
      req.body.paymentIntent,
      req.body.paymentMethodId,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create payment intent' })
  @ApiResponse({
    status: 200,
    description: 'Payment intent created successfully',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        paymentMethodId: {
          type: 'string',
        },
        amount: {
          type: 'number',
          example: 1000,
        },
      },
    },
  })
  @AllowedRoles(Roles.SELLER, Roles.BUYER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('create-payment-intent')
  public async createPaymentIntent(@Req() req: AuthRequest, @Body() data)
  {
    return await this.stripeService.createPaymentIntent(
      data.amount,
      req.user,
      data.paymentMethodId,
    );
  }

  @Post('webhook')
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Body() body: Stripe.Event,
  )
  {
    if (!signature)
    {
      throw new BadRequestException('Missing stripe-signature header');
    }
    await this.stripeService.handleEvent(body);
    return true;
  }
}
