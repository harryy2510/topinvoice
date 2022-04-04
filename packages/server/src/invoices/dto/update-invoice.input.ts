import { InputType, OmitType } from '@nestjs/graphql'
import { CreateInvoiceDTO } from './create-invoice.input'

@InputType('UpdateInvoice')
export class UpdateInvoiceDTO extends OmitType(CreateInvoiceDTO, ['company']) {}
