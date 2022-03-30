import { InputType } from '@nestjs/graphql'
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { DEFAULT_ID_LENGTH } from 'src/common/utils/default-id'
import { InvoiceStatusEnum } from '../enums/invoice-status.enum'

@InputType('CreateInvoice')
export class CreateInvoiceDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  invoiceNumber: string

  @IsOptional()
  @IsEnum(InvoiceStatusEnum)
  status?: InvoiceStatusEnum

  @IsOptional()
  @IsDate()
  invoiceDate?: Date

  @IsOptional()
  @IsDate()
  dueDate?: Date

  @IsOptional()
  @IsDate()
  paidDate?: Date

  @IsNotEmpty()
  @IsString()
  @MaxLength(DEFAULT_ID_LENGTH)
  companyId: string
}
