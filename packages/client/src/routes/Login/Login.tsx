import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Link } from '@mui/material'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link as RouterLink, Location, useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import Center from '../../components/Center'
import Flex from '../../components/Flex'
import Form from '../../components/forms/Form'
import FormInput from '../../components/forms/FormInput'
import AuthLayout from '../../components/layouts/AuthLayout'
import { LoginInput, useLoginMutation } from '../../graphql/generated'
import accessTokenState from '../../recoil/atoms/accessTokenState'
import redirectState from '../../recoil/atoms/redirectState'

const schema = yup
  .object({
    email: yup.string().email('Should be a valid email address').required('Required'),
    password: yup
      .string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Choose a password with at least 8 characters. Choose a mixture of upper and lower case letters, numbers, and symbols.'
      )
      .required('Required')
  })
  .required()

const defaultValues: LoginInput = {
  email: '',
  password: ''
}

const Login: FC = () => {
  const setAccessToken = useSetRecoilState(accessTokenState)
  const methods = useForm<LoginInput>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const { mutateAsync, isLoading } = useLoginMutation()
  const navigate = useNavigate()
  const { state } = useLocation()
  const setRedirect = useSetRecoilState(redirectState)
  useEffect(() => {
    if (state) {
      setRedirect(state as { from: Location })
    }
  }, [state, setRedirect])
  const handleSubmit = async (input: LoginInput) => {
    const data = await mutateAsync({ input })
    setAccessToken(data.login.accessToken)
    navigate('/')
  }
  return (
    <AuthLayout showSocialLogin title="Hi, Welcome Back">
      <Form<LoginInput> methods={methods} onSuccess={handleSubmit}>
        <FormInput name="email" label="Email" type="email" />
        <FormInput name="password" label="Password" type="password" />
        <Flex mt={1} justifyContent="flex-end">
          <Link variant="body2" component={RouterLink} to="/forgot">
            Forgot Password?
          </Link>
        </Flex>
        <Center mt={4}>
          <LoadingButton fullWidth size="large" loading={isLoading} variant="contained" type="submit">
            Sign In
          </LoadingButton>
        </Center>
        <Center mt={2}>
          <Link color="inherit" variant="body2" component={RouterLink} to="/register">
            Don't have an account?
          </Link>
        </Center>
      </Form>
    </AuthLayout>
  )
}

export default Login
