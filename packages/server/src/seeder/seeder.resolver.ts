import { Mutation, Resolver } from '@nestjs/graphql'
import { LoggedInUser } from 'src/auth/auth.interface'
import CurrentUser from 'src/common/decorators/current-user.decorator'
import { CompanyEntity } from '../companies/entities/company.entity'
import { InvoiceEntity } from '../invoices/entities/invoice.entity'
import { SeederService } from './seeder.service'

@Resolver()
export class SeederResolver {
  constructor(private readonly seederService: SeederService) {}

  @Mutation(() => [CompanyEntity], { nullable: true })
  seedClients(@CurrentUser() currentUser: LoggedInUser) {
    return this.seederService.clients(currentUser)
  }

  @Mutation(() => [InvoiceEntity], { nullable: true })
  seedInvoices(@CurrentUser() currentUser: LoggedInUser) {
    return this.seederService.invoices(currentUser)
  }
}
