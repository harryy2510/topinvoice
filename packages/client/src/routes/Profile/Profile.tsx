import { FC } from 'react'
import MainLayout from '../../components/layouts/MainLayout'
import { useViewerQuery } from '../../graphql/generated'

const Profile: FC = () => {
  const viewer = useViewerQuery()?.data?.viewer
  console.log({ viewer })
  return <MainLayout />
}

export default Profile
