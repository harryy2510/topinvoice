import config from '../config'
import axiosInstance from './axiosInstance'

export function axiosFetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    return axiosInstance.post<TData>(config.graphqlUrl, { query, variables })
  }
}
