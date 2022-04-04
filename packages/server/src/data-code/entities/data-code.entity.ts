import { FilterableField, IDField } from '@nestjs-query/query-graphql'
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { JSONScalar } from 'src/common/scalars'
import defaultId, { DEFAULT_ID_LENGTH } from 'src/common/utils/default-id'
import { DataCodeEnum } from 'src/data-code/enums/data-code.enum'
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('DataCode')
@ObjectType('DataCode')
export class DataCodeEntity {
  @PrimaryColumn('varchar', { length: DEFAULT_ID_LENGTH, unique: true })
  @IDField(() => ID)
  id: string = defaultId()

  @Column({ type: 'enum', enum: DataCodeEnum })
  @Field(() => DataCodeEnum)
  type: DataCodeEnum

  @Column({ length: DEFAULT_ID_LENGTH })
  @FilterableField()
  parent: string

  @Column('simple-json', { nullable: true })
  @Field(() => JSONScalar)
  data?: Object

  @Column('boolean', { default: false })
  used: boolean

  @Column('boolean', { default: false })
  expired: boolean

  @Column({ type: 'timestamp', nullable: true })
  @Field(() => GraphQLISODateTime)
  expireAt?: string

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt: string

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt: string
}
