import faker, { GenderType } from '@faker-js/faker'
import { CreateUser } from '../../src/graphql/generated'

const gender = faker.random.arrayElement<GenderType>(['female', 'male'])
const firstName = faker.name.firstName(gender)
const lastName = faker.name.lastName(gender)
const email = faker.internet.email(firstName, lastName).toLowerCase()
const password = 'asDF1234$'

const registerInput: CreateUser = {
  firstName,
  lastName,
  email,
  password
}

export default registerInput
