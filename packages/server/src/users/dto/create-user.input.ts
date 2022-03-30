import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from 'class-validator'
import { EmailAddressScalar, PasswordScalar, PhoneNumberScalar } from 'src/common/scalars'

@InputType('CreateUser')
export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  firstName: string

  @IsOptional()
  @IsString()
  @MaxLength(26)
  lastName?: string

  @Field(() => EmailAddressScalar)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @Field(() => PasswordScalar)
  password: string

  @Field(() => PhoneNumberScalar)
  @IsOptional()
  @IsPhoneNumber()
  phone?: string

  @IsOptional()
  @IsString()
  profileImage?: string
}
