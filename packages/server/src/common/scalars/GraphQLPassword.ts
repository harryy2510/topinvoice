import { GraphQLError, GraphQLScalarType, GraphQLScalarTypeConfig, Kind } from 'graphql'

const validate = (value: any) => {
  const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,255}$/

  if (typeof value !== 'string') {
    throw new TypeError(`Value is not string: ${value}`)
  }

  if (!PASSWORD_REGEX.test(value)) {
    throw new TypeError(`Must contain upper and lower case letters, numbers, and symbols.`)
  }

  return value
}

export const GraphQLPasswordConfig = {
  name: 'Password',

  description: 'A field whose value conforms to strong password',

  serialize: validate,

  parseValue: validate,

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as password but got a: ${ast.kind}`)
    }

    return validate(ast.value)
  },

  extensions: {
    codegenScalarType: 'string'
  }
} as GraphQLScalarTypeConfig<string, string>

export const GraphQLPassword: GraphQLScalarType = new GraphQLScalarType(GraphQLPasswordConfig)
