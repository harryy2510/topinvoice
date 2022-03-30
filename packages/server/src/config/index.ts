import appConfig, { AppConfig } from './app'
import authConfig, { AuthConfig } from './auth'
import databaseConfig, { DatabaseConfig } from './database'
import facebookConfig, { FacebookConfig } from './facebook'
import googleConfig, { GoogleConfig } from './google'
import mailConfig, { MailConfig } from './mail'
import redisConfig, { RedisConfig } from './redis'
import throttleConfig, { ThrottleConfig } from './throttle'

export interface Config {
  app: AppConfig
  auth: AuthConfig
  database: DatabaseConfig
  facebook: FacebookConfig
  google: GoogleConfig
  mail: MailConfig
  throttle: ThrottleConfig
  redis: RedisConfig
}

export default [
  appConfig,
  authConfig,
  databaseConfig,
  facebookConfig,
  googleConfig,
  mailConfig,
  throttleConfig,
  redisConfig
]
