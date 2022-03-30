import { registerAs } from '@nestjs/config'

export interface AppConfig {
  host: string
  port: number
  isDevelopment: boolean
  appUrl: string
  apiUrl: string
}

export default registerAs(
  'app',
  (): AppConfig => ({
    host: process.env.APP_HOST || '0.0.0.0',
    port: parseInt(process.env.APP_PORT, 10) || 3001,
    isDevelopment: process.env.APP_ENV === 'development',
    appUrl: process.env.APP_URL,
    apiUrl: process.env.API_URL
  })
)
