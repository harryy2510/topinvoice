import { registerAs } from '@nestjs/config'

export interface DatabaseConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
}

declare let db: any

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    host: db?.HOSTNAME || process.env.DATABASE_HOST,
    port: parseInt(db?.PORT || process.env.DATABASE_PORT, 10),
    database: db?.DATABASE || process.env.DATABASE_NAME,
    username: db?.USERNAME || process.env.DATABASE_USERNAME,
    password: db?.PASSWORD || process.env.DATABASE_PASSWORD
  })
)
