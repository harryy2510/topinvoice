import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as moment from 'moment'
import { UserEntity } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { CreateUserDTO } from '../users/dto/create-user.input'
import { TokenPayload } from './auth.interface'
import { LoginInput } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async login(loginInput: LoginInput) {
    const user = await this.usersService.findByCredentials(loginInput.email, loginInput.password)
    return this.createToken(user)
  }

  async register(userInput: CreateUserDTO) {
    const user = await this.usersService.createOne(userInput)
    return this.createToken(user)
  }

  async socialLogin(socialUser: Partial<UserEntity>) {
    let user = await this.usersService.repo.findOne({ where: { email: socialUser.email } })
    if (!user) {
      user = await this.usersService.createOne(socialUser)
    }
    return this.createToken(user)
  }

  private createToken(user: UserEntity) {
    const payload: TokenPayload = { sub: user.id.toString(), email: user.email }
    const accessToken = this.jwtService.sign(payload)
    const { exp } = this.jwtService.decode(accessToken) as Record<string, any>
    return { user, accessToken, expiry: moment(exp * 1000).toISOString() }
  }
}
