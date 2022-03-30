import {
  GraphQLCountryCode,
  GraphQLCurrency,
  GraphQLEmailAddress,
  GraphQLJSON,
  GraphQLPhoneNumber,
  GraphQLPostalCode,
  GraphQLURL
} from 'graphql-scalars'
import { createFromGraphQLScalar } from 'nest-graphql-scalar-adapter'
import { GraphQLPassword } from './GraphQLPassword'
// import { GraphQLUpload } from 'graphql-upload'

// export const FileScalar = createFromGraphQLScalar({ scalar: GraphQLUpload })
export const JSONScalar = createFromGraphQLScalar({ scalar: GraphQLJSON })
export const PasswordScalar = createFromGraphQLScalar({ scalar: GraphQLPassword })
export const EmailAddressScalar = createFromGraphQLScalar({ scalar: GraphQLEmailAddress })
export const PhoneNumberScalar = createFromGraphQLScalar({ scalar: GraphQLPhoneNumber })
// export const URLScalar = createFromGraphQLScalar({ scalar: GraphQLURL })
export const CountryCodeScalar = createFromGraphQLScalar({ scalar: GraphQLCountryCode })
export const PostalCodeScalar = createFromGraphQLScalar({ scalar: GraphQLPostalCode })
// export const CurrencyScalar = createFromGraphQLScalar({ scalar: GraphQLCurrency })

const scalars = [
  PasswordScalar,
  JSONScalar,
  EmailAddressScalar,
  PhoneNumberScalar,
  // URLScalar,
  CountryCodeScalar,
  PostalCodeScalar
  // CurrencyScalar
  // FileScalar
]
export default scalars
