import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { InstrumentsService } from './instruments.service';
import { AllowedRoles } from '../../core/decorators';
import { CreateResourceDto, UpdateResourceDto } from '../../core/dto';
import { Roles } from '../../core/enums';
import { RolesGuard } from '../../core/guards';
import {
  CommonFilterSchema,
  resourceResponseSchema,
  resourcesResponseSchema,
} from '../../core/swagger.objects';
import { AuthRequest } from '../../core/types/common';

@ApiTags('instruments')
@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The instrument has been successfully created.',
    schema: resourceResponseSchema,
  })
  @ApiOperation({ summary: 'Create new instrument' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  public async create(@Body() instrument: CreateResourceDto) {
    return await this.instrumentsService.create(instrument);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The instrument has been successfully updated.',
    schema: resourceResponseSchema,
  })
  @ApiOperation({ summary: 'Update instrument' })
  @ApiParam({ name: 'id', type: Number })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() instrument: UpdateResourceDto,
  ) {
    return await this.instrumentsService.update(id, instrument);
  }

  @ApiOperation({ summary: 'Get instrument by id' })
  @ApiResponse({
    status: 200,
    description: 'Return instrument by id.',
    schema: resourceResponseSchema,
  })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  public async findOneById(@Param('id') id: number) {
    return await this.instrumentsService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get all instruments' })
  @ApiResponse({
    status: 200,
    description: 'Return all instruments.',
    schema: resourcesResponseSchema,
  })
  @ApiQuery({ type: CommonFilterSchema })
  @Get()
  public async findAll(@Req() req: AuthRequest) {
    return await this.instrumentsService.findAll(req.filters);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The instrument has been successfully deleted.',
  })
  @ApiOperation({ summary: 'Delete instrument by id' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.instrumentsService.delete(id);
  }
}
