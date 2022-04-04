import { Module } from '@nestjs/common'
import { CompaniesModule } from '../companies/companies.module'
import { InvoiceItemsModule } from '../invoice-items/invoice-items.module'
import { InvoicesModule } from '../invoices/invoices.module'
import { SeederResolver } from './seeder.resolver'
import { SeederService } from './seeder.service'

@Module({
  imports: [CompaniesModule, InvoicesModule, InvoiceItemsModule],
  providers: [SeederService, SeederResolver]
})
export class SeederModule {}
