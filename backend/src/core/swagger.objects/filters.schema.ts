import { ApiProperty } from '@nestjs/swagger';

export class CommonFilterSchema<TFilters = void> {
  @ApiProperty({
    required: false,
    example: {
      search: {
        fields: ['name'],
        value: 'name',
      },
    },
  })
  search: {
    fields: string[];
    value: string;
  };

  @ApiProperty({
    required: false,
    example: 0,
  })
  offset?: number;

  @ApiProperty({
    required: false,
    example: 10,
  })
  limit?: number;

  @ApiProperty({
    required: false,
    example: {
      order: {
        field: 'name',
        direction: 'ASC',
      },
    },
  })
  order?: {
    field: string;
    direction: string;
  };

  @ApiProperty({
    required: false,
    example: {
      filters: {
        name: 'name',
      },
    },
  })
  filters?: TFilters;
}
