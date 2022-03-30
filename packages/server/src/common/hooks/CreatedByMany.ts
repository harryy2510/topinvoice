import { BeforeCreateManyHook, CreateManyInputType } from '@nestjs-query/query-graphql'
import { Injectable } from '@nestjs/common'
import { GraphQLExecutionContext } from '@nestjs/graphql'
import { LoggedInUser } from 'src/auth/auth.interface'
import { UserEntity } from 'src/users/entities/user.entity'
import contextReqRes from '../utils/contextReqRes'

interface CreatedByMany {
  user: Partial<UserEntity>
}

@Injectable()
export class CreatedByManyHook<T extends CreatedByMany> implements BeforeCreateManyHook<T, GraphQLExecutionContext> {
  async run(instance: CreateManyInputType<T>, context: GraphQLExecutionContext): Promise<CreateManyInputType<T>> {
    const loggedInUser: LoggedInUser = contextReqRes(context).req.user
    instance.input = instance.input.map((input) => ({
      ...input,
      user: {
        id: loggedInUser.id
      }
    }))
    return instance
  }
}
