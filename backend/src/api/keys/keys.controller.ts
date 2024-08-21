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

import { KeysService } from './keys.service';
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

@ApiTags('keys')
@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The key has been successfully created.',
    schema: resourceResponseSchema,
  })
  @ApiOperation({ summary: 'Create new key' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  public async create(@Body() key: CreateResourceDto) {
    return await this.keysService.create(key);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The key has been successfully updated.',
    schema: resourceResponseSchema,
  })
  @ApiOperation({ summary: 'Update key' })
  @ApiParam({ name: 'id', type: Number })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  public async update(@Param('id') id: number, @Body() key: UpdateResourceDto) {
    return await this.keysService.update(id, key);
  }

  @ApiOperation({ summary: 'Get key by id' })
  @ApiResponse({
    status: 200,
    description: 'Return category by id.',
    schema: resourceResponseSchema,
  })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  public async findOneById(@Param('id') id: number) {
    return await this.keysService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get all keys' })
  @ApiResponse({
    status: 200,
    description: 'Return all categories.',
    schema: resourcesResponseSchema,
  })
  @ApiQuery({ type: CommonFilterSchema })
  @Get()
  public async findAll(@Req() req: AuthRequest) {
    return await this.keysService.findAll(req.filters);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The key has been successfully deleted.',
  })
  @ApiOperation({ summary: 'Delete category by id' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.keysService.delete(id);
  }
}
