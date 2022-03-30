import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { Module } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.input'
import { UpdateUserDTO } from './dto/update-user.input'
import { UserEntity } from './entities/user.entity'
import { UsersService } from './users.service'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      services: [UsersService],
      resolvers: [
        {
          DTOClass: UserEntity,
          EntityClass: UserEntity,
          CreateDTOClass: CreateUserDTO,
          UpdateDTOClass: UpdateUserDTO,
          ServiceClass: UsersService,
          create: { disabled: true },
          read: { disabled: true },
          update: { many: { disabled: true } },
          delete: { disabled: true }
        }
      ]
    })
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
