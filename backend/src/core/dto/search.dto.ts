import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { SearchTarget } from '../swagger.objects/search.schema';
import { SearchFilters } from '../types/search';

export class SearchFiltersDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject({ each: true })
  order: {
    field: string;
    direction: 'ASC' | 'DESC';
  };

  @IsOptional()
  @ApiProperty({ required: false })
  @IsObject({ each: true })
  search: {
    fields: string[] | string;
    value: string;
  };

  @IsOptional()
  @ApiProperty({ required: false })
  @IsObject({ each: true })
  filters: SearchFilters;

  @IsOptional()
  @IsEnum(SearchTarget)
  target: SearchTarget;

  @IsOptional()
  @IsString()
  offset: string;

  @IsOptional()
  @IsString()
  limit: string;
}
