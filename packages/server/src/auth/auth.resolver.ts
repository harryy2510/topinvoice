import { UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import * as moment from 'moment'
import * as urlJoin from 'proper-url-join'
import CurrentUser from 'src/common/decorators/current-user.decorator'
import { Public } from 'src/common/decorators/public.decorator'
import { AppConfig } from 'src/config/app'
import { MailConfig } from 'src/config/mail'
import { DataCodeService } from 'src/data-code/data-code.service'
import { DataCodeEnum } from 'src/data-code/enums/data-code.enum'
import { EmailsService } from 'src/emails/emails.service'
import { CreateUserDTO } from 'src/users/dto/create-user.input'
import { UserEntity } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { LoggedInUser } from './auth.interface'
import { AuthService } from './auth.service'
import { ForgotPasswordInput } from './dto/forgot-password.dto'
import { LoginInput, LoginResponse } from './dto/login.dto'
import { ResetPasswordInput } from './dto/reset-password.dto'

@Resolver()
export class AuthResolver {
  private readonly appConfig: AppConfig
  private readonly template: MailConfig['template']

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly dataCodeService: DataCodeService,
    private readonly emailsService: EmailsService,
    private readonly configService: ConfigService
  ) {
    this.appConfig = this.configService.get<AppConfig>('app')
    this.template = this.configService.get<MailConfig>('mail').template
  }

  @Query(() => UserEntity, { nullable: true })
  async viewer(@CurrentUser() currentUser: LoggedInUser) {
    const viewer = await this.usersService.findById(currentUser.id)
    if (!viewer) {
      throw new UnauthorizedException()
    }
    return viewer
  }

  @Public()
  @Mutation(() => Boolean)
  async forgotPassword(@Args('input') forgotPasswordInput: ForgotPasswordInput) {
    try {
      const user = await this.usersService.repo.findOne({ where: { email: forgotPasswordInput.email } })
      if (user) {
        const dataCode = await this.dataCodeService.createOne({
          type: DataCodeEnum.ForgotPassword,
          expireAt: moment().add(1, 'd').toDate(),
          parent: user.email
        })
        await this.emailsService.send({
          dynamicTemplateData: {
            firstName: user.firstName,
            // @ts-ignore
            resetLink: urlJoin(this.appConfig.url, 'auth', 'reset', { query: { code: dataCode.id } })
          },
          to: user.email,
          templateId: this.template[DataCodeEnum.ForgotPassword]
        })
      }
    } catch (e) {
      console.log(e)
    }
    return true
  }

  @Public()
  @Mutation(() => Boolean)
  async resetPassword(@Args('input') resetPasswordInput: ResetPasswordInput) {
    const dataCode = await this.dataCodeService.findById(resetPasswordInput.code)
    const user = await this.usersService.repo.findOne({ where: { email: dataCode.parent } })
    if (user && DataCodeService.validateDataCode(dataCode)) {
      await this.usersService.updatePassword(user.id, resetPasswordInput.password)
      await this.dataCodeService.updateOne(dataCode.id, { used: true })
      // Todo: Send Email
    }
    return true
  }

  @Public()
  @Mutation(() => LoginResponse)
  login(@Args('input') loginInput: LoginInput) {
    return this.authService.login(loginInput)
  }

  @Public()
  @Mutation(() => LoginResponse)
  async register(@Args('input') userInput: CreateUserDTO) {
    const data = await this.authService.register(userInput)
    const dataCode = await this.dataCodeService.createOne({
      type: DataCodeEnum.Welcome,
      parent: data.user.email
    })
    await this.emailsService.send({
      dynamicTemplateData: {
        firstName: data.user.firstName,
        // @ts-ignore
        confirmLink: urlJoin(this.appConfig.url, 'auth', 'confirm', { query: { code: dataCode.id } })
      },
      templateId: this.template[DataCodeEnum.Welcome],
      to: data.user.email
    })
    return data
  }
}
