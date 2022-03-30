import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthConfig } from 'src/config/auth'
import { DataCodeModule } from 'src/data-code/data-code.module'
import { EmailsModule } from 'src/emails/emails.module'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { FacebookStrategy } from './strategies/facebook.strategy'
import { GoogleStrategy } from './strategies/google.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const authConfig = configService.get<AuthConfig>('auth')
        return {
          secret: authConfig.secret,
          signOptions: { expiresIn: authConfig.expiry }
        }
      },
      inject: [ConfigService]
    }),
    UsersModule,
    DataCodeModule,
    EmailsModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthResolver, JwtStrategy, GoogleStrategy, FacebookStrategy],
  exports: [AuthService, PassportModule, JwtModule]
})
export class AuthModule {}
