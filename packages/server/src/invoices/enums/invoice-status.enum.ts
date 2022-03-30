import { registerEnumType } from '@nestjs/graphql'

export enum InvoiceStatusEnum {
  Draft = 'Draft',
  Sent = 'Sent',
  Paid = 'Paid'
}

registerEnumType(InvoiceStatusEnum, { name: 'InvoiceStatusEnum' })
