import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator'
import { DEFAULT_ID_LENGTH } from 'src/common/utils/default-id'
import { CreateInvoiceCompanyDTO } from '../../invoices/dto/create-invoice.input'

@InputType('CreateInvoiceItemInvoice')
export class CreateInvoiceItemInvoiceDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(DEFAULT_ID_LENGTH)
  id: string
}

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
  @IsObject()
  @Field(() => CreateInvoiceItemInvoiceDTO)
  @ValidateNested()
  @Type(() => CreateInvoiceItemInvoiceDTO)
  invoice: CreateInvoiceItemInvoiceDTO
}
