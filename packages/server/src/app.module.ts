import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { NumberScalarMode } from '@nestjs/graphql/dist/interfaces/build-schema-options.interface'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ThrottlerModule } from '@nestjs/throttler'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join, resolve } from 'path'
import { AuthModule } from './auth/auth.module'
import { GqlAuthGuard } from './common/guards/gql-auth.guard'
import { GqlThrottlerGuard } from './common/guards/gql-throttler.guard'
import scalars from './common/scalars'
import { CompaniesModule } from './companies/companies.module'
import config from './config'
import app, { AppConfig } from './config/app'
import { DatabaseConfig } from './config/database'
import { RedisConfig } from './config/redis'
import { ThrottleConfig } from './config/throttle'
import { DataCodeModule } from './data-code/data-code.module'
import { EmailsModule } from './emails/emails.module'
import { InvoiceItemsModule } from './invoice-items/invoice-items.module'
import { InvoicesModule } from './invoices/invoices.module'

import { UsersModule } from './users/users.module'
import { SeederModule } from './seeder/seeder.module'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: config,
      ignoreEnvVars: true,
      isGlobal: true,
      expandVariables: true,
      envFilePath: resolve('..', '..', '.env')
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const appConfig = configService.get<AppConfig>('app')
        const throttleConfig = configService.get<ThrottleConfig>('throttle')
        return appConfig.isDevelopment ? {} : throttleConfig
      },
      inject: [ConfigService]
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const appConfig = configService.get<AppConfig>('app')
        return appConfig.isDevelopment
          ? []
          : [{ rootPath: join(__dirname, '..', '..', 'client', 'build'), exclude: ['/graphql', '/api'] }]
      },
      inject: [ConfigService]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get<DatabaseConfig>('database')
        const appConfig = configService.get<AppConfig>('app')
        return {
          ...databaseConfig,
          type: 'postgres',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/**/*.migration{.ts,.js}'],
          subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],
          autoLoadEntities: true,
          ...(appConfig.isDevelopment
            ? {
                // dropSchema: true,
                synchronize: true,
                logging: true
              }
            : {})
        }
      },
      inject: [ConfigService]
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const redisConfig = configService.get<RedisConfig>('redis')
        return {
          redis: redisConfig
        }
      },
      inject: [ConfigService]
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const appConfig = configService.get<AppConfig>('app')
        return {
          autoSchemaFile: join(process.cwd(), 'schema.graphql'),
          sortSchema: true,
          debug: appConfig.isDevelopment,
          playground: appConfig.isDevelopment,
          context: ({ req, res }) => ({ req, res }),
          buildSchemaOptions: {
            numberScalarMode: 'integer' as NumberScalarMode
          },
          autoTransformHttpErrors: true
        }
      },
      inject: [ConfigService]
    }),

    // Custom Modules
    UsersModule,
    CompaniesModule,
    InvoicesModule,
    InvoiceItemsModule,
    DataCodeModule,
    EmailsModule,
    AuthModule,
    SeederModule
  ],
  providers: [
    ...scalars,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard
    }
  ]
})
export class AppModule {}
