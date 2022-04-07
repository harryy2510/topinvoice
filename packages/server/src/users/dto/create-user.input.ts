import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { EmailAddressScalar, PasswordScalar } from 'src/common/scalars'

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

  @IsOptional()
  @IsString()
  profileImage?: string
}
