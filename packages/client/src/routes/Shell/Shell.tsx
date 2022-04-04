import { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Loading from '../../components/Loading'
import Header from './Header'
import Sidebar from './Sidebar'

const Shell: FC = () => {
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
