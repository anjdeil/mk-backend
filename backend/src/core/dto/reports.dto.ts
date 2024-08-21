import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { ReportStatus } from '../enums/reports';

export class CreateReportsDto {
  @ApiProperty()
  @IsString()
  report: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  musicId: number;
}

export class UpdateReportsDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  managerId?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;
}
