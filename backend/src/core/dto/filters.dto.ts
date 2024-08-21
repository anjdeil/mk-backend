import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional } from 'class-validator';

export class FiltersDto<TFilters = unknown> {
  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber()
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  offset: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject({ each: true })
  order: {
    field: string;
    direction: string;
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
  filters: TFilters;
}
