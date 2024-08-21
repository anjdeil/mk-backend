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

import { TypesService } from './types.service';
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

@ApiTags('types')
@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The track type has been successfully created.',
    schema: resourceResponseSchema,
  })
  @ApiOperation({ summary: 'Create new track type' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  public async create(@Body() type: CreateResourceDto) {
    return await this.typesService.create(type);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The track type has been successfully updated.',
    schema: resourceResponseSchema,
  })
  @ApiOperation({ summary: 'Update track type' })
  @ApiParam({ name: 'id', type: Number })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() type: UpdateResourceDto,
  ) {
    return await this.typesService.update(id, type);
  }

  @ApiOperation({ summary: 'Get track type by id' })
  @ApiResponse({
    status: 200,
    description: 'Return track type by id.',
    schema: resourceResponseSchema,
  })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  public async findOneById(@Param('id') id: number) {
    return await this.typesService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get all track types' })
  @ApiResponse({
    status: 200,
    description: 'Return all track types.',
    schema: resourcesResponseSchema,
  })
  @ApiQuery({ type: CommonFilterSchema })
  @Get()
  public async findAll(@Req() req: AuthRequest) {
    return await this.typesService.findAll(req.filters);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The track type has been successfully deleted.',
  })
  @ApiOperation({ summary: 'Delete track type by id' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.typesService.delete(id);
  }
}
