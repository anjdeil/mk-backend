import {
  Controller,
  Put,
  Req,
  Get,
  UseGuards,
  Body,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { DetailsService } from './details.service';
import { AllowedRoles } from '../../../../core/decorators';
import {
  CreateBillingAddressDto,
  CreatePayoutDto,
  UpdateBillingAddressDto,
  UpdatePayoutDto,
} from '../../../../core/dto';
import { Roles } from '../../../../core/enums';
import { RolesGuard } from '../../../../core/guards';
import { AuthRequest } from '../../../../core/types/common';

@ApiBearerAuth()
@ApiTags('profile details')
@Controller('profile/details')
export class DetailsController {
  constructor(private detailsService: DetailsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create billing details' })
  @ApiResponse({
    status: 200,
    description: 'The billing details has been successfully created',
    type: 'application/json',
  })
  @AllowedRoles(Roles.SELLER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('billing-details')
  async createBillingDetails(
    @Req() req: AuthRequest,
    @Body() data: CreateBillingAddressDto,
  ) {
    return await this.detailsService.createBillingAddress(data, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get billing details' })
  @ApiResponse({
    status: 200,
    description: 'The billing details has been successfully retrieved',
    type: 'application/json',
  })
  @AllowedRoles(Roles.SELLER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('billing-details')
  async getBillingDetails(@Req() req: AuthRequest) {
    return await this.detailsService.getBillingAddress(req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update billing details' })
  @ApiResponse({
    status: 200,
    description: 'The billing details has been successfully updated',
    type: 'application/json',
  })
  @AllowedRoles(Roles.SELLER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put('billing-details')
  async updateBillingDetails(
    @Req() req: AuthRequest,
    @Body() data: UpdateBillingAddressDto,
  ) {
    return await this.detailsService.updateBillingAddress(data, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create payout details' })
  @ApiResponse({
    status: 200,
    description: 'The payout details has been successfully created',
    type: 'application/json',
  })
  @AllowedRoles(Roles.SELLER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('payout-details')
  async createPayoutDetails(
    @Req() req: AuthRequest,
    @Body() data: CreatePayoutDto,
  ) {
    return await this.detailsService.createPayout(data, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payout details' })
  @ApiResponse({
    status: 200,
    description: 'The payout details has been successfully retrieved',
    type: 'application/json',
  })
  @AllowedRoles(Roles.SELLER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('payout-details')
  async getPayoutDetails(@Req() req: AuthRequest) {
    return await this.detailsService.getPayout(req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update payout details' })
  @ApiResponse({
    status: 200,
    description: 'The payout details has been successfully updated',
    type: 'application/json',
  })
  @AllowedRoles(Roles.SELLER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put('payout-details')
  async updatePayoutDetails(
    @Req() req: AuthRequest,
    @Body() data: UpdatePayoutDto,
  ) {
    return await this.detailsService.updatePayout(data, req.user.id);
  }
}
