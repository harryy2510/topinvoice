import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, Length } from 'class-validator'
import { JSONScalar } from 'src/common/scalars'
import { DEFAULT_ID_LENGTH } from 'src/common/utils/default-id'
import { DataCodeEnum } from 'src/data-code/enums/data-code.enum'

@InputType('CreateDataCode')
export class CreateDataCodeDTO {
  @Field(() => DataCodeEnum)
  @IsNotEmpty()
  @IsEnum(DataCodeEnum)
  type: DataCodeEnum

  @IsNotEmpty()
  @IsString()
  @Length(DEFAULT_ID_LENGTH)
  parent: string

  @Field(() => JSONScalar)
  @IsOptional()
  @IsObject()
  data: Object

  @IsOptional()
  @IsBoolean()
  used?: boolean

  @IsOptional()
  @IsBoolean()
  expired?: boolean

  @IsOptional()
  @IsDateString()
  expireAt?: string
}
