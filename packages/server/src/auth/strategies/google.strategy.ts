import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { AppConfig } from 'src/config/app'
import { GoogleConfig } from 'src/config/google'
import { UserEntity } from 'src/users/entities/user.entity'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      ...configService.get<GoogleConfig>('google'),
      callbackURL: `${configService.get<AppConfig>('app').apiUrl}/auth/google/callback`,
      scope: ['email', 'profile']
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<Partial<UserEntity>> {
    const { name, emails } = profile
    return {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      provider: 'Google'
    }
  }
}
