import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SalesService } from './sales.service';
import {
  CommonFilterSchema,
  getOrdersResponseSchema,
} from '../../core/swagger.objects';
import { AuthRequest } from '../../core/types/common';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'Return all orders.',
    schema: getOrdersResponseSchema,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({ type: CommonFilterSchema })
  @Get()
  public async getAllOrders(@Req() req: AuthRequest) {
    return await this.salesService.getAllUserOrders(req.filters);
  }
}
