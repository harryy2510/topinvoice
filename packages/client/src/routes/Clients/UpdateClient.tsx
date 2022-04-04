import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, DialogContent, DialogProps } from '@mui/material'
import { pick } from 'lodash-es'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import {
  ClientDetailsQuery,
  UpdateCompany,
  useClientDetailsQuery,
  useClientsQuery,
  useUpdateClientMutation
} from '../../graphql/generated'
import withDialog from '../../hoc/withDialog'
import CompanyForm, { CreateCompanyValidationSchema } from './components/CompanyForm'

export type UpdateClientProps = DialogProps & {
  client: ClientDetailsQuery['company']
}

const formId = 'update-client-form'

const updateKeys: Array<keyof UpdateCompany> = [
  'city',
  'contactEmail',
  'contactName',
  'country',
  'name',
  'postalCode',
  'state',
  'streetAddress',
  'taxName',
  'taxNumber',
  'taxRate',
  'website'
]

const UpdateClient: FC<UpdateClientProps> = ({ onClose, client }) => {
  const { mutateAsync, isLoading } = useUpdateClientMutation()
  const queryClient = useQueryClient()
  const methods = useForm<UpdateCompany>({
    defaultValues: pick(client, ...updateKeys),
    resolver: yupResolver(CreateCompanyValidationSchema)
  })
  const handleClose = () => onClose?.({}, 'backdropClick')
  const handleSubmit = async (company: UpdateCompany) => {
    await mutateAsync({ input: { update: company, id: client!.id } })
    queryClient.invalidateQueries(useClientsQuery.getKey())
    queryClient.invalidateQueries(useClientDetailsQuery.getKey({ id: client!.id }))
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

export default withDialog('Update Client')(UpdateClient)
