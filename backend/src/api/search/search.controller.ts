import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SearchService } from './search.service';
import { SearchFiltersDto } from '../../core/dto';
import { SearchSchema, SearchSchema2 } from '../../core/swagger.objects';
import { SearchFilters } from '../../core/types';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({ summary: 'Search NEW' })
  @ApiResponse({
    status: 200,
    description: 'Search',
  })
  @ApiQuery({
    type: SearchSchema2<SearchFilters>,
  })
  @Get()
  async searchNEW(@Query() query: SearchFiltersDto) {
    return await this.searchService.search2(query);
  }

  // @ApiOperation({ summary: 'Search' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Search',
  // })
  // @ApiQuery({
  //   type: SearchSchema<SearchFilters>,
  // })
  // @Get('old')
  // async search(@Query() query: SearchFiltersDto) {
  //   return await this.searchService.search(query);
  // }
}
