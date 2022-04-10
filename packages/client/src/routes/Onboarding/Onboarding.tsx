import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Card, CardContent, Typography } from '@mui/material'
import { FC, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import Center from '../../components/Center'
import Loading from '../../components/Loading'
import { UpdateUser, useUpdateUserMutation, useViewerQuery } from '../../graphql/generated'
import UserCompanyForm, {
  UserCompanyDefaultValues,
  UserCompanyValidationSchema
} from '../Profile/components/UserCompanyForm'
import Header from '../Shell/Header'

const formId = 'onboarding-form'

const Onboarding: FC = () => {
  const viewer = useViewerQuery()?.data?.viewer
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useUpdateUserMutation()

  const defaultValues = useMemo(
    (): UpdateUser => ({
      company: {
        ...UserCompanyDefaultValues.company!,
        contactName: `${viewer?.firstName ?? ''} ${viewer?.lastName ?? ''}`.trim(),
        contactEmail: viewer?.email ?? ''
      }
    }),
    [viewer]
  )

  const methods = useForm<UpdateUser>({
    defaultValues,
    resolver: yupResolver(UserCompanyValidationSchema)
  })

  useEffect(() => {
    methods.reset(defaultValues)
  }, [defaultValues])

  const handleSubmit = async (updateUser: UpdateUser) => {
    await mutateAsync({ input: { id: viewer?.id ?? '', update: updateUser } })
    await queryClient.invalidateQueries(useViewerQuery.getKey())
  }

  if (!viewer) {
    return <Loading />
  }

  return (
    <>
      <Header setupMode />
      <Center pt={16} pb={8} minHeight="100%">
        <Card sx={{ maxWidth: '100%', width: 640 }}>
          <CardContent sx={{ '&, &:last-child': { p: 4 } }}>
            <Typography fontWeight={600} align="center" variant="h5" color="text.secondary" mb={3}>
              Let's Get You Setup!
            </Typography>
            <UserCompanyForm hideContactDetails id={formId} methods={methods} onSuccess={handleSubmit} />
            <Center mt={4}>
              <LoadingButton
                data-cy="button-submit"
                form={formId}
                fullWidth
                size="large"
                loading={isLoading}
                variant="contained"
                type="submit"
              >
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
