import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsObject, IsOptional, ValidateNested } from 'class-validator'
import { UpdateCompanyDTO } from '../../companies/dto/update-company.input'
import { CreateUserDTO } from './create-user.input'

@InputType('UpdateUser')
export class UpdateUserDTO extends PartialType(OmitType(CreateUserDTO, ['email', 'password'])) {
  @Field(() => UpdateCompanyDTO)
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateCompanyDTO)
  company?: UpdateCompanyDTO
}
