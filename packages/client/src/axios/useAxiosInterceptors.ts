import { GraphQLResponse } from 'apollo-server-types'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'
import useModifiedRecoilState from '../hooks/useModifiedRecoilState'
import accessTokenState from '../recoil/atoms/accessTokenState'
import axiosInstance from './axiosInstance'

const useAxiosInterceptors = () => {
  const [accessToken, , resetAccessToken] = useModifiedRecoilState(accessTokenState)
  const [axiosReady, setAxiosReady] = useState(false)
  const accessTokenRef = useRef(accessToken)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    accessTokenRef.current = accessToken
  }, [accessToken])

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(async (request: AxiosRequestConfig) => {
      const token = accessTokenRef.current
      const headers = token
        ? {
            Authorization: `Bearer ${token}`
          }
        : {}
      return { ...request, headers }
    })
    const responseInterceptor1 = axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      const data = response.data as GraphQLResponse
      if (data.errors) {
        const gqlError = data.errors[0]
        throw {
          message: gqlError.message,
          response,
          request: response.request,
          isAxiosError: true,
          config: response.config,
          statusCode: (gqlError.extensions?.response as any)?.statusCode,
          code: gqlError.extensions?.code,
          name: 'Error',
          toJSON() {
            return this
          }
        }
      }
      return data?.data
    })
    const responseInterceptor2 = axiosInstance.interceptors.response.use(undefined, (error: any) => {
      if (error.statusCode === 401) {
        resetAccessToken()
      } else {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
      return Promise.reject(error)
    })
    setAxiosReady(true)
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor1)
      axiosInstance.interceptors.response.eject(responseInterceptor2)
    }
  }, [])

  return axiosReady
}

export default useAxiosInterceptors
