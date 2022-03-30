import { IDField } from '@nestjs-query/query-graphql'
import { ID, InputType, OmitType, PartialType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, Length } from 'class-validator'
import { DEFAULT_ID_LENGTH } from 'src/common/utils/default-id'
import { CreateDataCodeDTO } from './create-data-code.input'

@InputType('UpdateDataCode')
export class UpdateDataCodeDTO extends PartialType(OmitType(CreateDataCodeDTO, ['type', 'parent'])) {
  @IDField(() => ID)
  @IsNotEmpty()
  @IsString()
  @Length(DEFAULT_ID_LENGTH)
  id: string
}
