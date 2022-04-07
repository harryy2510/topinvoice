import { Authorize, IDField, OffsetConnection } from '@nestjs-query/query-graphql'
import {
  Field,
  GraphQLExecutionContext,
  GraphQLISODateTime,
  HideField,
  ID,
  ObjectType,
  PickType
} from '@nestjs/graphql'
import { hashSync } from 'bcrypt'
import { EmailAddressScalar } from 'src/common/scalars'
import defaultId, { DEFAULT_ID_LENGTH } from 'src/common/utils/default-id'
import { CompanyEntity } from 'src/companies/entities/company.entity'
import { InvoiceEntity } from 'src/invoices/entities/invoice.entity'
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { InvoiceItemEntity } from 'src/invoice-items/entities/invoice-item.entity'
import contextReqRes from '../../common/utils/contextReqRes'

@ObjectType('UserCompany')
export class UserCompanyEntity extends PickType(CompanyEntity, [
  'name',
  'taxRate',
  'taxName',
  'taxNumber',
  'contactName',
  'contactEmail',
  'streetAddress',
  'city',
  'state',
  'country',
  'postalCode',
  'website'
]) {}

@Entity('User')
@ObjectType('User')
@Authorize({ authorize: (context: GraphQLExecutionContext) => ({ id: { eq: contextReqRes(context).req.user.id } }) })
@OffsetConnection('clients', () => CompanyEntity, {
  disableUpdate: true,
  disableRemove: true,
  nullable: true,
  enableTotalCount: true
})
@OffsetConnection('invoices', () => InvoiceEntity, {
  disableUpdate: true,
  disableRemove: true,
  nullable: true,
  enableTotalCount: true
})
@OffsetConnection('invoiceItems', () => InvoiceItemEntity, {
  disableUpdate: true,
  disableRemove: true,
  nullable: true,
  enableTotalCount: true
})
export class UserEntity {
  @PrimaryColumn('varchar', { length: DEFAULT_ID_LENGTH, unique: true })
  @IDField(() => ID)
  id: string = defaultId()

  @Column()
  firstName: string

  @Column({ nullable: true })
  lastName?: string

  @Column({ unique: true })
  @Field(() => EmailAddressScalar)
  email: string

  @Column('simple-json', { nullable: true })
  @Field(() => UserCompanyEntity)
  company?: UserCompanyEntity

  @Column('boolean', { default: false })
  active: boolean

  @Column({ nullable: true })
  @HideField()
  password?: string

  @Column({ nullable: true })
  profileImage?: string

  @Column({ nullable: true })
  provider?: string

  @Column('integer', { default: 1 })
  nextInvoiceNumber: number = 1

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt: string

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt: string

  // relations
  @OneToMany(() => CompanyEntity, (company) => company.user)
  clients: CompanyEntity[]

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.user)
  invoices: InvoiceEntity[]

  @OneToMany(() => InvoiceItemEntity, (invoiceItem) => invoiceItem.user)
  invoiceItems: InvoiceItemEntity[]

  @BeforeInsert()
  async hashPassword() {
    this.password = this.password ? hashSync(this.password, 10) : null
  }
}
