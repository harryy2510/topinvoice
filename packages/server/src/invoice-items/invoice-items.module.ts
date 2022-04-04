import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { CreateInvoiceItemDTO } from './dto/create-invoice-item.input'
import { UpdateInvoiceItemDTO } from './dto/update-invoice-item.input'
import { InvoiceItemEntity } from './entities/invoice-item.entity'
import { InvoiceItemsService } from './invoice-items.service'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([InvoiceItemEntity])],
      services: [InvoiceItemsService],
      resolvers: [
        {
          DTOClass: InvoiceItemEntity,
          EntityClass: InvoiceItemEntity,
          CreateDTOClass: CreateInvoiceItemDTO,
          UpdateDTOClass: UpdateInvoiceItemDTO,
          ServiceClass: InvoiceItemsService,
          read: { disabled: true }
        }
      ]
    })
  ],
  providers: [InvoiceItemsService],
  exports: [InvoiceItemsService]
})
export class InvoiceItemsModule {}
