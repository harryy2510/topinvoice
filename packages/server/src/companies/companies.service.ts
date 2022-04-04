import { QueryService } from '@nestjs-query/core'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CompanyEntity } from './entities/company.entity'

@QueryService(CompanyEntity)
export class CompaniesService extends TypeOrmQueryService<CompanyEntity> {
  constructor(@InjectRepository(CompanyEntity) repo: Repository<CompanyEntity>) {
    super(repo)
  }
}
