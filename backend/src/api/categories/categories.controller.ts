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

import { CategoriesService } from './categories.service';
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

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
    schema: resourceResponseSchema,
  })
  @ApiOperation({ summary: 'Create new category' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  public async create(@Body() category: CreateResourceDto) {
    return await this.categoriesService.create(category);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully updated.',
    schema: resourceResponseSchema,
  })
  @ApiOperation({ summary: 'Update category' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  public async update(@Param('id') id, @Body() category: UpdateResourceDto) {
    return await this.categoriesService.update(id, category);
  }

  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({
    status: 200,
    description: 'Return category by id.',
    schema: resourceResponseSchema,
  })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  public async findOneById(@Param('id') id: number) {
    return await this.categoriesService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'Return all categories.',
    schema: resourcesResponseSchema,
  })
  @ApiQuery({ type: CommonFilterSchema })
  @Get()
  public async findAll(@Req() req: AuthRequest) {
    return await this.categoriesService.findAll(req.filters);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully deleted.',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delete category by id' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.categoriesService.delete(id);
  }
}
