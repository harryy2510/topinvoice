import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Grid, Link } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import Center from '../../components/Center'
import Form from '../../components/forms/Form'
import FormInput from '../../components/forms/FormInput'
import AuthLayout from '../../components/layouts/AuthLayout'
import { CreateUser, useRegisterMutation } from '../../graphql/generated'
import accessTokenState from '../../recoil/atoms/accessTokenState'

export const RegisterValidationSchema = yup
  .object({
    firstName: yup.string().required('Required'),
    lastName: yup.string(),
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

export const RegisterDefaultValues: CreateUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

const Register: FC = () => {
  const setAccessToken = useSetRecoilState(accessTokenState)
  const methods = useForm<CreateUser>({
    defaultValues: RegisterDefaultValues,
    resolver: yupResolver(RegisterValidationSchema)
  })
  const { mutateAsync, isLoading } = useRegisterMutation()
  const navigate = useNavigate()
  const handleSubmit = async (input: CreateUser) => {
    const data = await mutateAsync({ input })
    setAccessToken(data.register.accessToken)
    navigate('/')
  }
  return (
    <AuthLayout showSocialLogin title="Sign up">
      <Form<CreateUser> methods={methods} onSuccess={handleSubmit}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6}>
            <FormInput name="firstName" label="First Name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name="lastName" label="Last Name" />
          </Grid>
        </Grid>
        <FormInput name="email" label="Email" type="email" />
        <FormInput name="password" label="Password" type="password" />
        <Center mt={4}>
          <LoadingButton fullWidth size="large" loading={isLoading} variant="contained" type="submit">
            Sign Up
          </LoadingButton>
        </Center>
        <Center mt={2}>
          <Link color="inherit" variant="body2" component={RouterLink} to="/login">
            Already have an account?
          </Link>
        </Center>
      </Form>
    </AuthLayout>
  )
}

export default Register
