import
  {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import
  {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';

import { CartService } from './cart.service';
import { CartDto, UnauthorizedFlowDto } from '../../core/dto';
import { PaymentType } from '../../core/enums';
import { cartSchema } from '../../core/swagger.objects';
import { AuthRequest } from '../../core/types/common';

@ApiTags('cart')
@Controller('cart')
export class CartController
{
  constructor(private readonly cartService: CartService) { }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get cart' })
  @ApiResponse({
    status: 200,
    description: 'Get user`s cart',
    schema: {
      type: 'array',
      items: cartSchema,
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserCart(@Req() req: AuthRequest)
  {
    return this.cartService.getUserCart(req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add to cart' })
  @ApiResponse({
    status: 200,
    description: 'Add to cart',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addToCart(@Req() req: AuthRequest, @Body() data: CartDto)
  {
    return this.cartService.addToCart(req.user.id, data.fileId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete from cart' })
  @ApiResponse({
    status: 200,
    description: 'Delete from cart',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:fileId')
  async deleteFromCart(
    @Req() req: AuthRequest,
    @Param('fileId') fileId: number,
  )
  {
    return this.cartService.deleteFromCart(fileId, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete all from cart' })
  @ApiResponse({
    status: 200,
    description: 'Delete all from cart',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteAllFromCart(@Req() req: AuthRequest)
  {
    return this.cartService.deleteAllFromCart(req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Checkout' })
  @ApiResponse({
    status: 200,
    description: 'Checkout',
  })

  @UseGuards(AuthGuard('jwt'))
  @Post('checkout')
  async checkout(
    @Req() req: AuthRequest,
    @Query('paymentType') paymentType: PaymentType,
    @Query('paymentMethodId') paymentMethodId: string,
  )
  {
    return this.cartService.checkout(req.user, paymentType, paymentMethodId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unauthorised Checkout' })
  @ApiResponse({
    status: 200,
    description: 'Checkout',
  })
  @Post('unauthorised-checkout')
  async unauthorisedCheckout(@Body() data: UnauthorizedFlowDto)
  {
    return this.cartService.unauthorizedCheckout(data);
  }
}
