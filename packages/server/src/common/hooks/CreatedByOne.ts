import { BeforeCreateOneHook, CreateOneInputType } from '@nestjs-query/query-graphql'
import { Injectable } from '@nestjs/common'
import { GraphQLExecutionContext } from '@nestjs/graphql'
import { LoggedInUser } from 'src/auth/auth.interface'
import { UserEntity } from 'src/users/entities/user.entity'
import contextReqRes from '../utils/contextReqRes'

interface CreatedByOne {
  user: Partial<UserEntity>
}

@Injectable()
export class CreatedByOneHook<T extends CreatedByOne> implements BeforeCreateOneHook<T, GraphQLExecutionContext> {
  async run(instance: CreateOneInputType<T>, context: GraphQLExecutionContext): Promise<CreateOneInputType<T>> {
    const loggedInUser: LoggedInUser = contextReqRes(context).req.user
    instance.input.user = {
      id: loggedInUser.id
    }
    return instance
  }
}
