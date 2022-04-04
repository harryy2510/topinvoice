import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { CompaniesService } from './companies.service'
import { CreateCompanyDTO } from './dto/create-company.input'
import { UpdateCompanyDTO } from './dto/update-company.input'
import { CompanyEntity } from './entities/company.entity'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [InvoicesModule, NestjsQueryTypeOrmModule.forFeature([CompanyEntity])],
      services: [CompaniesService],
      resolvers: [
        {
          DTOClass: CompanyEntity,
          EntityClass: CompanyEntity,
          CreateDTOClass: CreateCompanyDTO,
          UpdateDTOClass: UpdateCompanyDTO,
          ServiceClass: CompaniesService,
          create: { many: { disabled: true } },
          update: { many: { disabled: true } },
          enableTotalCount: true,
          enableAggregate: true
        }
      ]
    })
  ],
  providers: [CompaniesService],
  exports: [CompaniesService]
})
export class CompaniesModule {}
