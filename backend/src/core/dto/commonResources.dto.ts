import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResourceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateResourceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
