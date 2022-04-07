import { GraphQLCountryCode, GraphQLEmailAddress, GraphQLJSON, GraphQLPostalCode } from 'graphql-scalars'
import { createFromGraphQLScalar } from 'nest-graphql-scalar-adapter'
import { GraphQLPassword } from './GraphQLPassword'

export const JSONScalar = createFromGraphQLScalar({ scalar: GraphQLJSON })
export const PasswordScalar = createFromGraphQLScalar({ scalar: GraphQLPassword })
export const EmailAddressScalar = createFromGraphQLScalar({ scalar: GraphQLEmailAddress })
export const CountryCodeScalar = createFromGraphQLScalar({ scalar: GraphQLCountryCode })
export const PostalCodeScalar = createFromGraphQLScalar({ scalar: GraphQLPostalCode })

const scalars = [PasswordScalar, JSONScalar, EmailAddressScalar, CountryCodeScalar, PostalCodeScalar]
export default scalars
