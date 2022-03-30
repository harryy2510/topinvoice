import { registerAs } from '@nestjs/config'

export interface GoogleConfig {
  clientID: string
  clientSecret: string
}

export default registerAs(
  'google',
  (): GoogleConfig => ({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET
  })
)
