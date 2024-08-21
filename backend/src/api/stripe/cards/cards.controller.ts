import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CardsService } from './cards.service';
import { AddCreditCardDto, SetDefaultCreditCardDto } from '../../../core/dto';
import { AuthRequest } from '../../../core/types/common';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post('default')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set default credit card' })
  @ApiResponse({
    status: 200,
    description: 'Default credit card set successfully',
  })
  async setDefaultCard(
    @Body() creditCard: SetDefaultCreditCardDto,
    @Req() request: AuthRequest,
  ) {
    await this.cardsService.setDefaultCreditCard(
      creditCard.paymentMethodId,
      request.user.stripeId,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add credit card' })
  @ApiResponse({ status: 200, description: 'Credit card added successfully' })
  @Post()
  async addCreditCard(
    @Body() creditCard: AddCreditCardDto,
    @Req() request: AuthRequest,
  ) {
    return this.cardsService.attachCreditCard(
      creditCard.paymentMethodId,
      request.user.stripeId,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Credit card delete' })
  @ApiResponse({
    status: 200,
    description: 'Credit card delete successfully',
  })
  @Delete('/:cardId')
  async deleteFromCart(@Param('cardId') cardId: string) {
    return this.cardsService.deleteCreditCard(cardId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get credit card list' })
  @ApiResponse({ status: 200, description: 'Return users credit cards' })
  @Get()
  async getCreditCards(@Req() request: AuthRequest) {
    return this.cardsService.listCreditCards(request.user.stripeId);
  }
}
