import { QueryService } from '@nestjs-query/core'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Repository } from 'typeorm'
import { DataCodeEntity } from './entities/data-code.entity'

// TODO: Mark inactive before insert

@QueryService(DataCodeEntity)
export class DataCodeService extends TypeOrmQueryService<DataCodeEntity> {
  constructor(@InjectRepository(DataCodeEntity) repo: Repository<DataCodeEntity>) {
    super(repo)
  }

  static validateDataCode(dataCode: DataCodeEntity): boolean {
    if (dataCode.used) {
      throw new Error('Data code is already used')
    }
    if (dataCode.expired || (dataCode.expireAt && moment(dataCode.expireAt).isSameOrBefore())) {
      throw new Error('Data code is expired')
    }
    return true
  }
}
