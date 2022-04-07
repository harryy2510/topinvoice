import { SortDirection } from '@nestjs-query/core'
import {
  Authorize,
  BeforeCreateMany,
  BeforeCreateOne,
  FilterableField,
  FilterableOffsetConnection,
  FilterableRelation,
  IDField,
  PagingStrategies,
  QueryOptions
} from '@nestjs-query/query-graphql'
import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import ownerAuthorizer from 'src/common/authorizers/owner.authorizer'
import { CreatedByManyHook } from 'src/common/hooks/CreatedByMany'
import { CreatedByOneHook } from 'src/common/hooks/CreatedByOne'
import { CountryCodeScalar, PostalCodeScalar } from 'src/common/scalars'
import defaultId, { DEFAULT_ID_LENGTH } from 'src/common/utils/default-id'
import { InvoiceEntity } from 'src/invoices/entities/invoice.entity'
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

@Entity('Company')
@ObjectType('Company')
@Authorize(ownerAuthorizer)
@BeforeCreateOne(CreatedByOneHook)
@BeforeCreateMany(CreatedByManyHook)
@FilterableRelation('user', () => UserEntity, { disableUpdate: true, disableRemove: true, allowFiltering: true })
@FilterableOffsetConnection('invoices', () => InvoiceEntity, {
  disableUpdate: true,
  disableRemove: true,
  nullable: true,
  enableTotalCount: true,
  allowFiltering: true
})
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  defaultSort: [{ direction: SortDirection.DESC, field: 'createdAt' }]
})
export class CompanyEntity {
  @PrimaryColumn('varchar', { length: DEFAULT_ID_LENGTH, unique: true })
  @IDField(() => ID)
  id: string = defaultId()

  @Column()
  @FilterableField()
  name: string

  @Column()
  @FilterableField()
  contactName: string

  @Column()
  @FilterableField()
  contactEmail: string

  @Column('float')
  @FilterableField()
  taxRate: number

  @Column({ nullable: true, default: 'VAT' })
  @FilterableField()
  taxName?: string

  @Column()
  @FilterableField()
  taxNumber: string

  @Column({ nullable: true })
  @FilterableField()
  streetAddress?: string

  @Column({ nullable: true })
  @FilterableField()
  city?: string

  @Column({ length: 10, nullable: true })
  @FilterableField()
  state?: string

  @Column({ length: 2 })
  @FilterableField(() => CountryCodeScalar)
  country: string

  @Column({ length: 10 })
  @FilterableField(() => PostalCodeScalar)
  postalCode: string

  @Column({ nullable: true })
  @FilterableField()
  website?: string

  @CreateDateColumn()
  @FilterableField(() => GraphQLISODateTime)
  createdAt: string

  @UpdateDateColumn()
  @FilterableField(() => GraphQLISODateTime)
  updatedAt: string

  // relations
  @ManyToOne(() => UserEntity, (user) => user.clients, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  user: UserEntity

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.company)
  invoices: InvoiceEntity[]
}
