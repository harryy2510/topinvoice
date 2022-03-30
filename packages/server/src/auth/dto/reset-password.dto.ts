import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, Length } from 'class-validator'
import { PasswordScalar } from 'src/common/scalars'
import { DEFAULT_ID_LENGTH } from 'src/common/utils/default-id'

@InputType()
export class ResetPasswordInput {
  @IsNotEmpty()
  @IsString()
  @Length(DEFAULT_ID_LENGTH)
  code: string

  @IsNotEmpty()
  @IsString()
  @Field(() => PasswordScalar)
  password: string
}
