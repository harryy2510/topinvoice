import { LoginInput } from '../../src/graphql/generated'

const email = 'test@test.com'
const password = 'asDF1234$'

const loginInput: LoginInput = {
  email,
  password
}

export default loginInput
