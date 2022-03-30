import { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Loading from '../../components/Loading'
import { useViewerQuery } from '../../graphql/generated'
import Header from './Header'
import Sidebar from './Sidebar'

const Shell: FC = () => {
  const { isLoading } = useViewerQuery()

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Header />
      <Sidebar>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Sidebar>
    </>
  )
}

export default Shell
