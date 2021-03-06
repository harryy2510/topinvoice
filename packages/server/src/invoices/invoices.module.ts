import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { CreateInvoiceDTO } from './dto/create-invoice.input'
import { UpdateInvoiceDTO } from './dto/update-invoice.input'
import { InvoiceEntity } from './entities/invoice.entity'
import { InvoicesService } from './invoices.service'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([InvoiceEntity]), UsersModule],
      services: [InvoicesService],
      resolvers: [
        {
          DTOClass: InvoiceEntity,
          EntityClass: InvoiceEntity,
          CreateDTOClass: CreateInvoiceDTO,
          UpdateDTOClass: UpdateInvoiceDTO,
          ServiceClass: InvoicesService,
          create: { many: { disabled: true } }
        }
      ]
    })
  ],
  providers: [InvoicesService],
  exports: [InvoicesService]
})
export class InvoicesModule {}
