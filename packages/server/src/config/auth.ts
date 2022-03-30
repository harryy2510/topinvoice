import { registerAs } from '@nestjs/config'

export interface AuthConfig {
  secret: string
  expiry: number
}

export default registerAs(
  'auth',
  (): AuthConfig => ({
    secret: process.env.AUTH_SECRET,
    expiry: parseInt(process.env.AUTH_EXPIRY, 10)
  })
)
