import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { LoggedInUser } from 'src/auth/auth.interface'
import contextReqRes from '../utils/contextReqRes'

const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): LoggedInUser => {
  return contextReqRes(context).req.user
})

export default CurrentUser
