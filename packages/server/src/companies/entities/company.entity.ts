import {
  Authorize,
  BeforeCreateMany,
  BeforeCreateOne,
  FilterableField,
  IDField,
  OffsetConnection,
  PagingStrategies,
  QueryOptions,
  Relation
} from '@nestjs-query/query-graphql'
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
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
@Relation('user', () => UserEntity, { disableUpdate: true, disableRemove: true })
@OffsetConnection('invoices', () => InvoiceEntity, {
  disableUpdate: true,
  disableRemove: true,
  nullable: true,
  enableTotalCount: true
})
@QueryOptions({ pagingStrategy: PagingStrategies.OFFSET, enableTotalCount: true })
export class CompanyEntity {
  @PrimaryColumn('varchar', { length: DEFAULT_ID_LENGTH, unique: true })
  @IDField(() => ID)
  id: string = defaultId()

  @Column()
  @FilterableField()
  name: string

  @Column('float')
  taxRate: number

  @Column({ nullable: true, default: 'VAT' })
  taxName?: string

  @Column({ nullable: true })
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
  website?: string

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt: Date

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt: Date

  // relations
  @ManyToOne(() => UserEntity, (user) => user.clients, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  user: UserEntity

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.company)
  invoices: InvoiceEntity[]
}
