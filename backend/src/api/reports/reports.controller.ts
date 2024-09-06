import
  {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import
  {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';

import { ReportsService } from './reports.service';
import { AllowedRoles } from '../../core/decorators';
import { CreateReportsDto, UpdateReportsDto } from '../../core/dto';
import { Roles } from '../../core/enums';
import { RolesGuard } from '../../core/guards';
import { AuthRequest } from '../../core/types/common';

@ApiTags('reports')
@Controller('reports')
export class ReportsController
{
  constructor(private readonly reportsService: ReportsService) { }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get all reports',
  })
  @ApiOperation({ summary: 'Get all reports' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async findAll(@Query() query: any)
  {
    return await this.reportsService.findAll(query);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get report by id',
  })
  @ApiOperation({ summary: 'Get report by id' })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: number)
  {
    return await this.reportsService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Create report',
  })
  @ApiOperation({ summary: 'The report was successfully created' })
  @ApiBody({ type: CreateReportsDto })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() data: CreateReportsDto, @Req() req: AuthRequest)
  {
    console.log(data);
    return await this.reportsService.createReport(data, req.user.id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Update report',
  })
  @ApiOperation({ summary: 'The report was successfully updated' })
  @ApiBody({ type: UpdateReportsDto })
  @AllowedRoles(Roles.ADMIN, Roles.MODERATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateReportsDto)
  {
    return await this.reportsService.update(id, data);
  }
}
