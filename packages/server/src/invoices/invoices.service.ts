import { QueryService } from '@nestjs-query/core'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { UsersService } from 'src/users/users.service'
import { InvoiceEntity } from './entities/invoice.entity'

@QueryService(InvoiceEntity)
export class InvoicesService extends TypeOrmQueryService<InvoiceEntity> {
  constructor(@InjectRepository(InvoiceEntity) repo: Repository<InvoiceEntity>, private usersService: UsersService) {
    super(repo)
  }

  async createOne(record: DeepPartial<InvoiceEntity>): Promise<InvoiceEntity> {
    const user = await this.usersService.findById(record.user.id)
    record.invoiceNumber = user.nextInvoiceNumber
    const invoiceEntity = await super.createOne(record)
    await this.usersService.updateOne(record.user.id, { nextInvoiceNumber: user.nextInvoiceNumber + 1 })
    return invoiceEntity
  }

  async createMany(records: DeepPartial<InvoiceEntity>[]): Promise<InvoiceEntity[]> {
    const userId = records[0].user.id
    const user = await this.usersService.findById(userId)
    records = records.map((record, index) => {
      record.invoiceNumber = user.nextInvoiceNumber + index
      return record
    })
    const invoiceEntities = await super.createMany(records)
    await this.usersService.updateOne(userId, {
      nextInvoiceNumber: user.nextInvoiceNumber + invoiceEntities.length
    })
    return invoiceEntities
  }
}
