import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, DialogContent, DialogProps } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { UpdateUser, useClientsQuery, useCreateClientMutation } from '../../graphql/generated'
import withDialog from '../../hoc/withDialog'
import UserCompanyForm, {
  UserCompanyDefaultValues,
  UserCompanyValidationSchema
} from '../Profile/components/UserCompanyForm'

export type CreateClientProps = DialogProps

const formId = 'create-client-form'

const CreateClient: FC<CreateClientProps> = ({ onClose }) => {
  const { mutateAsync, isLoading } = useCreateClientMutation()
  const queryClient = useQueryClient()
  const methods = useForm<UpdateUser>({
    defaultValues: UserCompanyDefaultValues,
    resolver: yupResolver(UserCompanyValidationSchema)
  })
  const handleClose = () => onClose?.({}, 'backdropClick')
  const handleSubmit = async (updateUser: UpdateUser) => {
    await mutateAsync({ input: { company: updateUser.company! } })
    queryClient.invalidateQueries(useClientsQuery.getKey())
    handleClose()
  }
  return (
    <>
      <DialogContent>
        <UserCompanyForm id={formId} methods={methods} onSuccess={handleSubmit} />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={handleClose} variant="text">
          Cancel
        </Button>
        <LoadingButton loading={isLoading} variant="contained" form={formId} type="submit">
          Submit
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default withDialog('Add Client')(CreateClient)
