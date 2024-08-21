import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConfirmDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}

export class UpdateConfirmDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly used: boolean;
}
