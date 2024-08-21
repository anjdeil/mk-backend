import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TransactionsService } from './transactions.service';
import { getOrdersResponseSchema } from '../../core/swagger.objects';
import { AuthRequest } from '../../core/types/common';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({
    status: 200,
    description: "Return all user's transactions",
    schema: getOrdersResponseSchema,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getAllUserTransactions(@Req() req: AuthRequest) {
    return await this.transactionsService.getAllUserTransactions(req.user.id);
  }
}
