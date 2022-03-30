import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { CountryCodeScalar, PostalCodeScalar } from 'src/common/scalars'

@InputType('CreateCompany')
export class CreateCompanyDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string

  @IsNotEmpty()
  @IsNumber()
  taxRate: number

  @IsOptional()
  @IsString()
  @MaxLength(255)
  taxName?: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  streetAddress?: string

  @IsOptional()
  @IsString()
  @MaxLength(85)
  city?: string

  @IsOptional()
  @IsString()
  @MaxLength(10)
  state?: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  @Field(() => CountryCodeScalar)
  country: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @Field(() => PostalCodeScalar)
  postalCode: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  website?: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  currency?: string
}
