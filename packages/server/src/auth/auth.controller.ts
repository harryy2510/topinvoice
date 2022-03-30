import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import * as urlJoin from 'proper-url-join'
import { Public } from 'src/common/decorators/public.decorator'
import app, { AppConfig } from 'src/config/app'
import { UserEntity } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  private readonly appConfig: AppConfig

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {
    this.appConfig = this.configService.get<AppConfig>('app')
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Public()
  @Get('login/callback')
  async loginCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies.token
    res.clearCookie('token')
    return token
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.socialLogin(req.user as Partial<UserEntity>)
    res.cookie('token', data.accessToken, { httpOnly: true, sameSite: 'strict', secure: true, path: '/' })
    // @ts-ignore
    res.redirect(302, urlJoin(this.appConfig.appUrl, 'login', 'callback'))
  }

  @Public()
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookAuth() {}

  @Public()
  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.socialLogin(req.user as Partial<UserEntity>)
    res.cookie('token', data.accessToken, { httpOnly: true, sameSite: 'strict', secure: true, path: '/' })
    // @ts-ignore
    res.redirect(302, urlJoin(this.appConfig.appUrl, 'login', 'callback'))
  }
}
