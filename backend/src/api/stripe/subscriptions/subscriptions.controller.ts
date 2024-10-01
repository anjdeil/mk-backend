import
  {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import
  {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiTags,
  } from '@nestjs/swagger';

import { SubscriptionsService } from './subscriptions.service';
import { StripeSubscriptionPlan } from '../../../core/enums';
import { AuthRequest } from '../../../core/types/common';

export interface CreateSubscriptionDto
{
  price: StripeSubscriptionPlan;
}

export interface UpdatePaymentMethodDto
{
  paymentMethodId: string;
}

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController
{
  constructor(private readonly subscriptionsService: SubscriptionsService) { }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create subscription' })
  @ApiResponse({
    status: 200,
    description: 'Subscription created successfully',
    schema: {
      type: 'object',
      properties: {
        clientSecret: {
          type: 'string',
        },
        subscriptionId: {
          type: 'string',
        },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        price: {
          type: 'string',
          enum: Object.values(StripeSubscriptionPlan),
        },
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createSubscription(
    @Body() data: CreateSubscriptionDto,
    @Req() request: AuthRequest,
  )
  {
    return this.subscriptionsService.createSubscription(
      request.user.stripeId,
      data.price,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel subscription' })
  @ApiResponse({
    status: 200,
    description: 'Subscription canceled successfully',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async cancelSubscription(@Req() request: AuthRequest)
  {
    return this.subscriptionsService.cancelSubscription(request.user.stripeId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update subscription' })
  @ApiResponse({
    status: 200,
    description: 'Subscription updated successfully',
    schema: {
      type: 'object',
      properties: {
        clientSecret: {
          type: 'string',
        },
        subscriptionId: {
          type: 'string',
        },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        price: {
          type: 'string',
          enum: Object.values(StripeSubscriptionPlan),
        },
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateSubscription(
    @Body() data: CreateSubscriptionDto,
    @Req() request: AuthRequest,
  )
  {
    console.log('OLLOLOLO', request.user.id);
    return this.subscriptionsService.updateSubscription(
      request.user.stripeId,
      data.price,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update subscription payment' })
  @ApiResponse({
    status: 200,
    description: 'Subscription updated successfully',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        paymentMethodId: {
          type: 'string',
        },
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('paymentMethod')
  async updatePaymenMethod(
    @Body() data: UpdatePaymentMethodDto,
    @Req() request: AuthRequest,
  )
  {
    return this.subscriptionsService.updatePaymentMethod(
      request.user,
      data.paymentMethodId,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get subscription' })
  @ApiResponse({
    status: 200,
    description: 'Subscription retrieved successfully',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getSubscription(@Req() request: AuthRequest)
  {
    return this.subscriptionsService.getSubscription(request.user.stripeId);
  }
}
