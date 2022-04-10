import faker from '@faker-js/faker'
import { UserCompany } from '../../src/graphql/generated'

const name = faker.company.companyName(0)
const website = faker.internet.url()

const taxName = faker.random.arrayElement(['GST', 'VAT'])
const taxRate = faker.random.arrayElement([5, 9, 10, 18])
const taxNumber = faker.finance.routingNumber()

const streetAddress = faker.address.streetAddress()
const country = 'IN'
const state = 'MP'
const city = faker.address.city()
const postalCode = faker.address.zipCodeByState(state).toString()

const onboardingInput: Partial<UserCompany> = {
  name,
  website,

  taxName,
  taxRate,
  taxNumber,

  streetAddress,
  country,
  state,
  city,
  postalCode
}

export default onboardingInput
