import { ExecutionContext } from '@nestjs/common'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'

const contextReqRes = (context: ExecutionContext) => {
  if (context.getType) {
    const type = context.getType<GqlContextType>()
    if (type === 'graphql') {
      return GqlExecutionContext.create(context).getContext()
    } else {
      const [req, res] = context.getArgs()
      return { req, res }
    }
  }
  return context
}

export default contextReqRes
