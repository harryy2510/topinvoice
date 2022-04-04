import { SortDirection } from '@nestjs-query/core'
import {
  Authorize,
  BeforeCreateMany,
  BeforeCreateOne,
  FilterableField,
  IDField,
  PagingStrategies,
  QueryOptions,
  Relation
} from '@nestjs-query/query-graphql'
import { UnPagedRelation } from '@nestjs-query/query-graphql/dist/src/decorators/relation.decorator'
import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import ownerAuthorizer from 'src/common/authorizers/owner.authorizer'
import { CreatedByManyHook } from 'src/common/hooks/CreatedByMany'
import { CreatedByOneHook } from 'src/common/hooks/CreatedByOne'
import defaultId, { DEFAULT_ID_LENGTH } from 'src/common/utils/default-id'
import { CompanyEntity } from 'src/companies/entities/company.entity'
import { InvoiceItemEntity } from 'src/invoice-items/entities/invoice-item.entity'
import { UserEntity } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { InvoiceStatusEnum } from '../enums/invoice-status.enum'

@Entity('Invoice')
@ObjectType('Invoice')
@Authorize(ownerAuthorizer)
@BeforeCreateOne(CreatedByOneHook)
@BeforeCreateMany(CreatedByManyHook)
@Relation('user', () => UserEntity, { disableRemove: true })
@Relation('company', () => CompanyEntity, { disableRemove: true, allowFiltering: true })
@UnPagedRelation('items', () => InvoiceItemEntity, {
  disableUpdate: true,
  disableRemove: true,
  nullable: true
})
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  defaultSort: [{ direction: SortDirection.DESC, field: 'createdAt' }]
})
export class InvoiceEntity {
  @PrimaryColumn('varchar', { length: DEFAULT_ID_LENGTH, unique: true })
  @IDField(() => ID)
  id: string = defaultId()

  @Column('integer')
  @FilterableField()
  invoiceNumber: number

  @Column('enum', { enum: InvoiceStatusEnum })
  @FilterableField(() => InvoiceStatusEnum, { defaultValue: InvoiceStatusEnum.Draft })
  status: InvoiceStatusEnum

  @Column({ type: 'timestamp' })
  @FilterableField(() => GraphQLISODateTime)
  invoiceDate: string

  @Column({ type: 'timestamp', nullable: true })
  @FilterableField(() => GraphQLISODateTime)
  dueDate?: string

  @Column({ type: 'timestamp', nullable: true })
  @FilterableField(() => GraphQLISODateTime)
  paidDate?: string

  @CreateDateColumn()
  @FilterableField(() => GraphQLISODateTime)
  createdAt: string

  @UpdateDateColumn()
  @FilterableField(() => GraphQLISODateTime)
  updatedAt: string

  // relations
  @ManyToOne(() => UserEntity, (user) => user.invoices, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  user: UserEntity

  @ManyToOne(() => CompanyEntity, (company) => company.invoices, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  company: CompanyEntity

  @OneToMany(() => InvoiceItemEntity, (invoiceItem) => invoiceItem.invoice)
  items: InvoiceItemEntity[]
}
