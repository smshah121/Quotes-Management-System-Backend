import { IsOptional, IsString, IsNumber } from 'class-validator';

export class QuoteUpdateDto {
  @IsOptional()
  @IsString()
  quote?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsNumber()
  userId?: number;
}