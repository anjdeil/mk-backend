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

import { MoodsService } from './moods.service';
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

@ApiTags('moods')
@Controller('moods')
export class MoodsController {
  constructor(private readonly moodsService: MoodsService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The mood has been successfully created.',
    schema: resourceResponseSchema,
  })
  @ApiOperation({ summary: 'Create new category' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  public async create(@Body() mood: CreateResourceDto) {
    return await this.moodsService.create(mood);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The mood has been successfully updated.',
    schema: resourceResponseSchema,
  })
  @ApiOperation({ summary: 'Update mood' })
  @ApiParam({ name: 'id', type: Number })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() mood: UpdateResourceDto,
  ) {
    return await this.moodsService.update(id, mood);
  }

  @ApiOperation({ summary: 'Get mood by id' })
  @ApiResponse({
    status: 200,
    description: 'Return mood by id.',
    schema: resourceResponseSchema,
  })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  public async findOneById(@Param('id') id: number) {
    return await this.moodsService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get all moods' })
  @ApiResponse({
    status: 200,
    description: 'Return all moods.',
    schema: resourcesResponseSchema,
  })
  @ApiQuery({ type: CommonFilterSchema })
  @Get()
  public async findAll(@Req() req: AuthRequest) {
    return await this.moodsService.findAll(req.filters);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The mood has been successfully deleted.',
  })
  @ApiOperation({ summary: 'Delete mood by id' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.moodsService.delete(id);
  }
}
