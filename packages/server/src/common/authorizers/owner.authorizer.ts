import { GraphQLExecutionContext } from '@nestjs/graphql'
import contextReqRes from 'src/common/utils/contextReqRes'

const ownerAuthorizer = {
  authorize: (context: GraphQLExecutionContext) => ({
    user: { id: { eq: contextReqRes(context).req.user.id } }
  })
}

export default ownerAuthorizer
