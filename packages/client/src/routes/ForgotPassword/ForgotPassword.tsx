import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Link, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import * as yup from 'yup'
import Center from '../../components/Center'
import Form from '../../components/forms/Form'
import FormInput from '../../components/forms/FormInput'
import AuthLayout from '../../components/layouts/AuthLayout'
import { ForgotPasswordInput, useForgotPasswordMutation } from '../../graphql/generated'

const ForgotPasswordValidationSchema = yup
  .object({
    email: yup.string().email('Should be a valid email address').required('Required')
  })
  .required()

export const ForgotPasswordDefaultValues: ForgotPasswordInput = {
  email: ''
}

const ForgotPassword: FC = () => {
  const { enqueueSnackbar } = useSnackbar()
  const methods = useForm<ForgotPasswordInput>({
    defaultValues: ForgotPasswordDefaultValues,
    resolver: yupResolver(ForgotPasswordValidationSchema)
  })
  const { mutateAsync, isLoading } = useForgotPasswordMutation()
  const navigate = useNavigate()
  const handleSubmit = async (input: ForgotPasswordInput) => {
    const data = await mutateAsync({ input })
    enqueueSnackbar('Please check your email for further instructions.')
    navigate('/login')
  }
  return (
    <AuthLayout title="Forgot password?">
      <Typography variant="body2" fontWeight={500} align="center" my={4} mb={1}>
        Enter your email address below and we'll send you a password reset link.
      </Typography>
      <Form<ForgotPasswordInput> methods={methods} onSuccess={handleSubmit}>
        <FormInput name="email" label="Email" type="email" />
        <Center mt={4}>
          <LoadingButton fullWidth size="large" loading={isLoading} variant="contained" type="submit">
            Send Email
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

export default ForgotPassword
