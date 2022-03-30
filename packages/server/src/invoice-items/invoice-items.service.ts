import { QueryService } from '@nestjs-query/core'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InvoiceItemEntity } from './entities/invoice-item.entity'

@QueryService(InvoiceItemEntity)
export class InvoiceItemsService extends TypeOrmQueryService<InvoiceItemEntity> {
  constructor(@InjectRepository(InvoiceItemEntity) repo: Repository<InvoiceItemEntity>) {
    super(repo)
  }
}
