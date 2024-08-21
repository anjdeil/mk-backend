import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCreditCardDto {
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // number: string;
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // expMonth: string;
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // expYear: string;
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // holderName: string;
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // cvc: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cardToken: string;
}
export class AddCreditCardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;
}

export class CreateChargeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  amount: number;
}

export class SetDefaultCreditCardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;
}
