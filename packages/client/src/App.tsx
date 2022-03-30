import { FC } from 'react'
import { QueryClientProvider } from 'react-query'
import useAxiosInterceptors from './axios/useAxiosInterceptors'
import BaseRoutes from './BaseRoutes'
import Loading from './components/Loading'
import useAuthorizedQueryClient from './hooks/useAuthorizedQueryClient'

const App: FC = () => {
  const axiosReady = useAxiosInterceptors()
  const queryClient = useAuthorizedQueryClient()

  if (!axiosReady) {
    return <Loading />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BaseRoutes />
    </QueryClientProvider>
  )
}

export default App
