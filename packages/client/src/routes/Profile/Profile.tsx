import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Paper, Typography } from '@mui/material'
import { omit } from 'lodash-es'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import * as yup from 'yup'
import Flex from '../../components/Flex'
import FormInput from '../../components/forms/FormInput'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/Loading'
import { UpdateUser, useUpdateUserMutation, useViewerQuery } from '../../graphql/generated'
import mergeSchemas from '../../utils/mergeSchemas'
import UserCompanyForm, { UserCompanyValidationSchema } from './components/UserCompanyForm'

const formId = 'update-user-form'

export const UpdateUserValidationSchema = mergeSchemas(
  yup
    .object({
      firstName: yup.string().required('Required'),
      lastName: yup.string()
    })
    .required(),
  UserCompanyValidationSchema
)

const Profile: FC = () => {
  const viewer = useViewerQuery()?.data?.viewer
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useUpdateUserMutation()

  const defaultValues = useMemo((): UpdateUser => omit(viewer, 'id', 'email'), [viewer])

  const methods = useForm<UpdateUser>({
    defaultValues,
    resolver: yupResolver(UpdateUserValidationSchema)
  })

  const resetForm = useCallback(() => {
    methods.reset(defaultValues)
  }, [methods, defaultValues])

  useEffect(() => {
    resetForm()
  }, [resetForm])

  const handleSubmit = async (updateUser: UpdateUser) => {
    await mutateAsync({
      input: {
        id: viewer?.id ?? '',
        update: {
          ...updateUser,
          company: {
            ...updateUser.company!,
            contactName: `${updateUser?.firstName ?? ''} ${updateUser?.lastName ?? ''}`.trim()
          }
        }
      }
    })
    await queryClient.invalidateQueries(useViewerQuery.getKey())
  }

  if (!viewer) {
    return <Loading />
  }

  return (
    <MainLayout title="Profile">
      <UserCompanyForm gridProps={{ md: 6 }} hideContactDetails id={formId} onSuccess={handleSubmit} methods={methods}>
        <Typography gutterBottom variant="body2">
          Personal Information
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, pt: 1 }}>
          <FormInput name="firstName" label="First Name" />
          <FormInput name="lastName" label="Last Name" />
        </Paper>
      </UserCompanyForm>
      <Flex justifyContent="center" alignItems="center" mt={8}>
        <LoadingButton
          size="large"
          form={formId}
          disabled={!methods.formState.isDirty}
          loading={isLoading}
          variant="contained"
          type="submit"
        >
          Update
        </LoadingButton>
        <Button sx={{ ml: 2 }} onClick={resetForm} disabled={isLoading || !methods.formState.isDirty} variant="text">
          Reset
        </Button>
      </Flex>
    </MainLayout>
  )
}

export default Profile
