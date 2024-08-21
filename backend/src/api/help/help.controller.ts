import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HelpService } from './help.service';
import HelpRequest from '../../core/models/help.entity';

@ApiTags('help')
@Controller('help')
export class HelpController {
  constructor(private readonly helpService: HelpService) {}

  @ApiOperation({ summary: 'Create a new help request' })
  @ApiResponse({
    status: 201,
    description: 'The help request has been successfully created',
    type: HelpRequest,
  })
  @Post()
  async createHelpRequest(@Body() data: HelpRequest): Promise<HelpRequest> {
    return await this.helpService.createHelpRequest(data);
  }

  @ApiOperation({ summary: 'Get all help requests' })
  @ApiResponse({
    status: 200,
    description: 'Return all help requests',
    type: HelpRequest,
    isArray: true,
  })
  @Get()
  async getAllHelpRequests(): Promise<HelpRequest[]> {
    return await this.helpService.findAllHelpRequests();
  }

  @ApiOperation({ summary: 'Get a help request by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the help request with the specified ID',
    type: HelpRequest,
  })
  @Get(':id')
  async getHelpRequestById(@Param('id') id: number): Promise<HelpRequest> {
    return await this.helpService.findHelpRequestById(id);
  }
}
