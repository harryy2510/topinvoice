import { registerAs } from '@nestjs/config'

export interface ThrottleConfig {
  ttl: number
  limit: number
}

export default registerAs(
  'throttle',
  (): ThrottleConfig => ({
    ttl: parseInt(process.env.THROTTLE_TTL, 10),
    limit: parseInt(process.env.THROTTLE_LIMIT, 10)
  })
)
