import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { DataCodeService } from './data-code.service'
import { CreateDataCodeDTO } from './dto/create-data-code.input'
import { UpdateDataCodeDTO } from './dto/update-data-code.input'
import { DataCodeEntity } from './entities/data-code.entity'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DataCodeEntity])],
      services: [DataCodeService],
      resolvers: [
        {
          DTOClass: DataCodeEntity,
          EntityClass: DataCodeEntity,
          CreateDTOClass: CreateDataCodeDTO,
          UpdateDTOClass: UpdateDataCodeDTO,
          ServiceClass: DataCodeService,
          create: { disabled: true },
          read: { many: { disabled: true } },
          update: { disabled: true },
          delete: { disabled: true }
        }
      ]
    })
  ],
  providers: [DataCodeService],
  exports: [DataCodeService]
})
export class DataCodeModule {}
