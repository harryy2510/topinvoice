import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { UserEntity } from 'src/users/entities/user.entity'
import { EmailAddressScalar, PasswordScalar } from '../../common/scalars'

@InputType()
export class LoginInput {
  @Field(() => EmailAddressScalar)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @Field(() => PasswordScalar)
  password: string
}

@ObjectType()
export class LoginResponse {
  accessToken: string
  expiry: string
  user: UserEntity
}
