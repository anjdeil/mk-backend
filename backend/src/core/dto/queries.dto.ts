import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ArtistIdDto {
  @ApiProperty({ example: 67, required: true })
  @Type(() => Number)
  @IsNumber()
  artistId: number;
}

export class CategoryFilterDto {
  @ApiProperty({
    required: true,
    isArray: true,
    type: Number,
    default: [1, 2],
  })
  categories: number[];
}

export class PaginationDto {
  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsNumber()
  offset: number;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsNumber()
  limit: number;
}
