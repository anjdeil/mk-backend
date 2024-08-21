import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWithdrawalDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export class UpdateWithdrawalDto {
  @IsNotEmpty()
  @IsString()
  bankTransactionId: string;

  @IsOptional()
  @IsNumber()
  transactionId: string;
}
