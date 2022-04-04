import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, DialogContent, DialogProps } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { CreateCompany, useClientsQuery, useCreateClientMutation } from '../../graphql/generated'
import withDialog from '../../hoc/withDialog'
import CompanyForm, { CreateCompanyDefaultValues, CreateCompanyValidationSchema } from './components/CompanyForm'

export type CreateClientProps = DialogProps

const formId = 'create-client-form'

const CreateClient: FC<CreateClientProps> = ({ onClose }) => {
  const { mutateAsync, isLoading } = useCreateClientMutation()
  const queryClient = useQueryClient()
  const methods = useForm({
    defaultValues: CreateCompanyDefaultValues,
    resolver: yupResolver(CreateCompanyValidationSchema)
  })
  const handleClose = () => onClose?.({}, 'backdropClick')
  const handleSubmit = async (company: CreateCompany) => {
    await mutateAsync({ input: { company } })
    queryClient.invalidateQueries(useClientsQuery.getKey())
    handleClose()
  }
  return (
    <>
      <DialogContent>
        <CompanyForm id={formId} methods={methods} onSuccess={handleSubmit} />
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
