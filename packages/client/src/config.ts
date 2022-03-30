export interface Config {
  graphqlUrl: string
  apiUrl: string
  storagePrefix: string
  publicUrl: string
  isDevelopment: boolean
}

const config: Config = {
  graphqlUrl: process.env.REACT_APP_GRAPHQL_URL!,
  apiUrl: process.env.REACT_APP_API_URL!,
  storagePrefix: process.env.REACT_APP_STORAGE_PREFIX!,
  publicUrl: process.env.PUBLIC_URL!,
  isDevelopment: process.env.NODE_ENV === 'development'
}

export default config
