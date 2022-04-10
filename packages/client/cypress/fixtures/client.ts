import faker, { GenderType } from '@faker-js/faker'
import { UserCompany } from '../../src/graphql/generated'
import onboardingInput from './onboarding'

const gender = faker.random.arrayElement<GenderType>(['female', 'male'])
const firstName = faker.name.firstName(gender)
const lastName = faker.name.lastName(gender)
const email = faker.internet.email(firstName, lastName).toLowerCase()

const contactName = `${firstName} ${lastName}`
const contactEmail = faker.internet.email(firstName, lastName).toLowerCase()

const clientInput: Partial<UserCompany> = {
  ...onboardingInput,
  contactName,
  contactEmail
}

export default clientInput
