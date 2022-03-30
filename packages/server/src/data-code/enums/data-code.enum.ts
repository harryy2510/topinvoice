import { registerEnumType } from '@nestjs/graphql'

export enum DataCodeEnum {
  ForgotPassword = 'ForgotPassword',
  Welcome = 'Welcome'
}

registerEnumType(DataCodeEnum, { name: 'DataCodeEnum' })
