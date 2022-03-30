import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import contextReqRes from '../utils/contextReqRes'

const ResGql = createParamDecorator((data: unknown, context: ExecutionContext) => {
  return contextReqRes(context).res
})

export default ResGql
