import { InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { DEFAULT_ID_LENGTH } from 'src/common/utils/default-id'

@InputType('CreateInvoiceItem')
export class CreateInvoiceItemDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsOptional()
  @IsNumber()
  discount?: number

  @IsOptional()
  @IsString()
  unit?: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(DEFAULT_ID_LENGTH)
  invoiceId: string
}
