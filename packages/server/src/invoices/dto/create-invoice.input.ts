import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested
} from 'class-validator'
import { DEFAULT_ID_LENGTH } from 'src/common/utils/default-id'
import { InvoiceStatusEnum } from '../enums/invoice-status.enum'

@InputType('CreateInvoiceCompany')
export class CreateInvoiceCompanyDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(DEFAULT_ID_LENGTH)
  id: string
}

@InputType('CreateInvoice')
export class CreateInvoiceDTO {
  @IsOptional()
  @IsEnum(InvoiceStatusEnum)
  status?: InvoiceStatusEnum

  @IsOptional()
  @IsDateString()
  invoiceDate?: string

  @IsOptional()
  @IsDateString()
  dueDate?: string

  @IsOptional()
  @IsDateString()
  paidDate?: string

  @IsNotEmpty()
  @IsObject()
  @Field(() => CreateInvoiceCompanyDTO)
  @ValidateNested()
  @Type(() => CreateInvoiceCompanyDTO)
  company: CreateInvoiceCompanyDTO
}
