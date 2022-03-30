import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Card, CardContent, Typography } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router'
import Center from '../../components/Center'
import { UpdateCompany, useOnboardingMutation, useViewerQuery } from '../../graphql/generated'
import CompanyForm, {
  CreateCompanyDefaultValues,
  CreateCompanyValidationSchema
} from '../Clients/components/CompanyForm'
import Header from '../Shell/Header'

const formId = 'onboarding-form'

const Onboarding: FC = () => {
  const methods = useForm<UpdateCompany>({
    defaultValues: CreateCompanyDefaultValues,
    resolver: yupResolver(CreateCompanyValidationSchema)
  })
  const viewer = useViewerQuery()?.data?.viewer
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useOnboardingMutation()
  const navigate = useNavigate()

  const handleSubmit = async (company: UpdateCompany) => {
    await mutateAsync({ input: { id: viewer?.id ?? '', update: { company } } })
    await queryClient.invalidateQueries(useViewerQuery.getKey())
  }

  return (
    <>
      <Header setupMode />
      <Center pt={8} height="100%">
        <Card sx={{ maxWidth: '100%', width: 440 }}>
          <CardContent sx={{ '&, &:last-child': { p: 4 } }}>
            <Typography fontWeight={600} align="center" variant="h5" color="text.secondary" mb={3}>
              Let's Get You Setup!
            </Typography>
            <CompanyForm id={formId} methods={methods} onSuccess={handleSubmit} />
            <Center mt={4}>
              <LoadingButton form={formId} fullWidth size="large" loading={isLoading} variant="contained" type="submit">
                Update
              </LoadingButton>
            </Center>
          </CardContent>
        </Card>
      </Center>
    </>
  )
}

export default Onboarding
