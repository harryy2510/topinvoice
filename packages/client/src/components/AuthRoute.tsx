import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Outlet, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { useViewerQuery } from '../graphql/generated'
import accessTokenState from '../recoil/atoms/accessTokenState'
import { RedirectStateType } from '../recoil/atoms/redirectState'
import Loading from './Loading'

const AuthRoute: FC = () => {
  const accessToken = useRecoilValue(accessTokenState)
  const viewer = useViewerQuery()?.data?.viewer
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const state: RedirectStateType = { from: location }
    let redirectUrl = ''

    if (!accessToken) {
      redirectUrl = '/login'
    } else if (viewer && !viewer.company && !location.pathname.startsWith('/onboarding')) {
      redirectUrl = '/onboarding'
    } else if (viewer && viewer.company && location.pathname.startsWith('/onboarding')) {
      redirectUrl = '/'
    }

    if (redirectUrl) {
      navigate(redirectUrl, { state })
    }
  }, [navigate, accessToken, viewer, location])

  return accessToken ? <Outlet /> : <Loading />
}

export default AuthRoute
