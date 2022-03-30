import { registerAs } from '@nestjs/config'
import { DataCodeEnum } from 'src/data-code/enums/data-code.enum'

export interface MailConfig {
  apiKey: string
  template: Record<DataCodeEnum, string>
}

export default registerAs(
  'mail',
  (): MailConfig => ({
    apiKey: process.env.SENDGRID_API_KEY,
    template: {
      [DataCodeEnum.Welcome]: process.env.SENDGRID_Welcome_TEMPLATE_ID,
      [DataCodeEnum.ForgotPassword]: process.env.SENDGRID_ForgotPassword_TEMPLATE_ID
    }
  })
)
