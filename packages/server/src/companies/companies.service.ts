import { QueryService } from '@nestjs-query/core'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { CompanyEntity } from './entities/company.entity'

@QueryService(CompanyEntity)
export class CompaniesService extends TypeOrmQueryService<CompanyEntity> {}
