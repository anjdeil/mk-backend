import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { WithdrawalService } from './withdrawal.service';
import { AllowedRoles } from '../../core/decorators';
import { CreateWithdrawalDto, UpdateWithdrawalDto } from '../../core/dto';
import { Roles, TransactionStatus } from '../../core/enums';
import { RolesGuard } from '../../core/guards';
import {
  createWithdrawaleSchema,
  updateWithdrawaleSchema,
  withdrawaleSchema,
} from '../../core/swagger.objects';
import { AuthRequest } from '../../core/types/common';

@ApiTags('withdrawal')
@Controller('widthdrawal')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The withdrawal has been successfully created.',
    schema: withdrawaleSchema,
  })
  @ApiOperation({ summary: 'Create a withdrawal' })
  @ApiBody({ schema: createWithdrawaleSchema })
  @AllowedRoles(Roles.SELLER)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async createWithdrawal(
    @Body() data: CreateWithdrawalDto,
    @Req() req: AuthRequest,
  ) {
    return await this.withdrawalService.create(data.amount, req.user.id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The withdrawal has been successfully updated.',
    schema: withdrawaleSchema,
  })
  @ApiOperation({ summary: 'Update a withdrawal' })
  @ApiBody({ schema: updateWithdrawaleSchema })
  @ApiParam({ name: 'id', type: Number })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  public async updateWithdrawal(
    @Param('id') id: number,
    @Body() data: UpdateWithdrawalDto,
  ) {
    return await this.withdrawalService.update(id, data.bankTransactionId);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The withdrawal has been successfully rejected.',
    schema: withdrawaleSchema,
  })
  @ApiOperation({ summary: 'Reject a withdrawal' })
  @ApiParam({ name: 'id', type: Number })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('reject/:id')
  public async rejectWithdrawal(@Param('id') id: number) {
    return await this.withdrawalService.changeStatus(
      id,
      TransactionStatus.REJECTED,
    );
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The withdrawal has been successfully confirmed.',
    schema: withdrawaleSchema,
  })
  @ApiOperation({ summary: 'Confirm a withdrawal' })
  @ApiParam({ name: 'id', type: Number })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('confirm/:id')
  public async confirmWithdrawal(@Param('id') id: number) {
    return await this.withdrawalService.changeStatus(
      id,
      TransactionStatus.FINISHED,
    );
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get all withdrawals.',
    schema: withdrawaleSchema,
  })
  @ApiOperation({ summary: 'Get all withdrawals' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  public async getAllWithdrawals(@Query() filters: any) {
    return await this.withdrawalService.findAll(filters);
  }
}
