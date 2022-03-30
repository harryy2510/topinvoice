import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { EmailAddressScalar } from 'src/common/scalars'

@InputType()
export class ForgotPasswordInput {
  @Field(() => EmailAddressScalar)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string
}
