import { QueryService } from '@nestjs-query/core'
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, hashSync } from 'bcrypt'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'

@QueryService(UserEntity)
export class UsersService extends TypeOrmQueryService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repo: Repository<UserEntity>) {
    super(repo)
  }

  async findByCredentials(email: string, password: string): Promise<UserEntity> {
    const user = await this.repo.findOne({ where: { email } })
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST)
    }

    const areEqual = await compare(password, user.password)
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST)
    }
    return user
  }

  async updatePassword(id: string, password: string): Promise<UserEntity> {
    const hashedPassword = hashSync(password, 10)
    return this.updateOne(id, { password: hashedPassword })
  }
}
