import faker from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { LoggedInUser } from 'src/auth/auth.interface'
import { CompaniesService } from 'src/companies/companies.service'
import { InvoicesService } from 'src/invoices/invoices.service'
import { CompanyEntity } from '../companies/entities/company.entity'
import { InvoiceItemEntity } from '../invoice-items/entities/invoice-item.entity'
import { InvoiceItemsService } from '../invoice-items/invoice-items.service'
import { InvoiceEntity } from '../invoices/entities/invoice.entity'
import { InvoiceStatusEnum } from '../invoices/enums/invoice-status.enum'

@Injectable()
export class SeederService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly invoicesService: InvoicesService,
    private readonly invoiceItemsService: InvoiceItemsService
  ) {}

  async clients(currentUser: LoggedInUser) {
    const companyEntities: CompanyEntity[] = Array(3)
      .fill(null)
      .map(() => {
        const state = faker.address.stateAbbr()
        return {
          name: faker.company.companyName(0),
          streetAddress: faker.address.streetAddress(),
          country: faker.address.countryCode(),
          state,
          city: faker.address.city(),
          postalCode: faker.address.zipCodeByState(state),
          taxName: faker.random.arrayElement(['GST', 'VAT']),
          taxRate: faker.random.arrayElement([5, 9, 10, 18]),
          website: faker.internet.url(),
          contactName: faker.name.findName(),
          contactEmail: faker.internet.email(),
          taxNumber: faker.finance.routingNumber(),
          user: {
            id: currentUser.id
          }
        } as CompanyEntity
      })
    return this.companiesService.createMany(companyEntities)
  }

  async invoices(currentUser: LoggedInUser) {
    const userId = currentUser.id
    const companyEntities = await this.companiesService.query({ filter: { user: { id: { eq: userId } } } })
    const invoiceEntities: InvoiceEntity[] = Array(3)
      .fill(null)
      .map(
        () =>
          ({
            company: faker.random.arrayElement(companyEntities),
            invoiceDate: faker.date.recent().toISOString(),
            dueDate: faker.random.arrayElement([faker.date.soon().toISOString(), null]),
            paidDate: faker.random.arrayElement([faker.date.future().toISOString(), null]),
            status: faker.random.arrayElement([
              InvoiceStatusEnum.Draft,
              InvoiceStatusEnum.Paid,
              InvoiceStatusEnum.Sent
            ]),
            items: Array(10)
              .fill(null)
              .map(() => ({
                user: {
                  id: currentUser.id
                },
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                discount: faker.random.arrayElement([0, 5, 10]),
                price: faker.datatype.number({ min: 50, max: 5000, precision: 10 }),
                unit: faker.random.arrayElement(['hrs', 'days', 'weeks', 'months']),
                quantity: faker.datatype.number({ min: 1, max: 10, precision: 1 })
              })),
            user: {
              id: currentUser.id
            }
          } as InvoiceEntity)
      )
    const invoices = await this.invoicesService.createMany(invoiceEntities)
    const invoiceIds = invoices.map((invoiceEntity) => invoiceEntity.id)

    const invoiceItemEntities: InvoiceItemEntity[] = invoiceIds.flatMap((invoiceId) =>
      Array(2)
        .fill(null)
        .map(
          () =>
            ({
              user: {
                id: currentUser.id
              },
              invoice: {
                id: invoiceId
              },
              name: faker.commerce.productName(),
              description: faker.commerce.productDescription(),
              discount: faker.random.arrayElement([0, 5, 10]),
              price: faker.datatype.number({ min: 5000, max: 500000, precision: 10 }),
              unit: faker.random.arrayElement(['hrs', 'days', 'weeks', 'months']),
              quantity: faker.datatype.number({ min: 1, max: 10, precision: 1 })
            } as InvoiceItemEntity)
        )
    )
    await this.invoiceItemsService.createMany(invoiceItemEntities)
    return this.invoicesService.query({ filter: { id: { in: invoiceIds } } })
  }
}
