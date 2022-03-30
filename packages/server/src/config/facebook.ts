import { registerAs } from '@nestjs/config'

export interface FacebookConfig {
  clientID: string
  clientSecret: string
}

export default registerAs(
  'facebook',
  (): FacebookConfig => ({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET
  })
)
