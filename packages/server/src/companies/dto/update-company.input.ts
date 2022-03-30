import { InputType } from '@nestjs/graphql'
import { CreateCompanyDTO } from './create-company.input'

@InputType('UpdateCompany')
export class UpdateCompanyDTO extends CreateCompanyDTO {}
