import axios from 'axios'
import urlJoin from 'proper-url-join'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSetRecoilState } from 'recoil'
import Loading from '../../components/Loading'
import config from '../../config'
import accessTokenState from '../../recoil/atoms/accessTokenState'

const LoginCallback: FC = () => {
  const setAccessToken = useSetRecoilState(accessTokenState)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const token = await axios
        .get(urlJoin(config.apiUrl, 'auth', 'login', 'callback'), { withCredentials: true })
        .then((res) => res.data)
      if (token) {
        setAccessToken(token)
      }
      navigate('/')
    })()
  }, [setAccessToken, navigate])

  return <Loading />
}

export default LoginCallback
