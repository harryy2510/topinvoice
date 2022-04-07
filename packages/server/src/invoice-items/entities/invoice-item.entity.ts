import {
  Authorize,
  BeforeCreateMany,
  BeforeCreateOne,
  FilterableField,
  FilterableRelation,
  IDField,
  PagingStrategies,
  QueryOptions
} from '@nestjs-query/query-graphql'
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import ownerAuthorizer from 'src/common/authorizers/owner.authorizer'
import { CreatedByManyHook } from 'src/common/hooks/CreatedByMany'
import { CreatedByOneHook } from 'src/common/hooks/CreatedByOne'
import defaultId, { DEFAULT_ID_LENGTH } from 'src/common/utils/default-id'
import { InvoiceEntity } from 'src/invoices/entities/invoice.entity'
import { UserEntity } from 'src/users/entities/user.entity'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('InvoiceItem')
@ObjectType('InvoiceItem')
@Authorize(ownerAuthorizer)
@BeforeCreateOne(CreatedByOneHook)
@BeforeCreateMany(CreatedByManyHook)
@FilterableRelation('user', () => UserEntity, { disableUpdate: true, disableRemove: true, allowFiltering: true })
@FilterableRelation('invoice', () => InvoiceEntity, { disableUpdate: true, disableRemove: true, allowFiltering: true })
@QueryOptions({ pagingStrategy: PagingStrategies.NONE })
export class InvoiceItemEntity {
  @PrimaryColumn('varchar', { length: DEFAULT_ID_LENGTH, unique: true })
  @IDField(() => ID)
  id: string = defaultId()

  @Column()
  @FilterableField()
  name: string

  @Column('text', { nullable: true })
  description?: string

  @Column('float')
  quantity: number

  @Column('float')
  price: number

  @Column('float', { nullable: true })
  discount?: number

  @Column({ nullable: true })
  unit?: string

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt: string

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt: string

  // relations
  @ManyToOne(() => UserEntity, (user) => user.invoices, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  user: UserEntity

  @ManyToOne(() => InvoiceEntity, (invoice) => invoice.items, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  invoice: InvoiceEntity
}
