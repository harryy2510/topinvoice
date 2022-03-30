import { InputType, OmitType } from '@nestjs/graphql'
import { CreateInvoiceItemDTO } from './create-invoice-item.input'

@InputType('UpdateInvoiceItem')
export class UpdateInvoiceItemDTO extends OmitType(CreateInvoiceItemDTO, ['invoiceId']) {}
