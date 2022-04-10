import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, DialogContent, DialogProps } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router'
import { CreateInvoice as ICreateInvoice, useCreateInvoiceMutation, useInvoicesQuery } from '../../graphql/generated'
import withDialog from '../../hoc/withDialog'
import InvoiceCreateForm, {
  CreateInvoiceDefaultValues,
  CreateInvoiceValidationSchema
} from './components/InvoiceCreateForm'

export type CreateInvoiceProps = DialogProps & {
  clientId?: string
}

const formId = 'create-invoice-form'

const CreateInvoice: FC<CreateInvoiceProps> = ({ onClose, clientId }) => {
  const { mutateAsync, isLoading } = useCreateInvoiceMutation()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const methods = useForm<ICreateInvoice>({
    defaultValues: {
      ...CreateInvoiceDefaultValues,
      ...(clientId ? { company: { id: clientId } } : {})
    },
    resolver: yupResolver(CreateInvoiceValidationSchema)
  })
  const handleClose = () => onClose?.({}, 'backdropClick')
  const handleSubmit = async (invoice: ICreateInvoice) => {
    const data = await mutateAsync({ input: { invoice } })
    queryClient.invalidateQueries(useInvoicesQuery.getKey())
    handleClose()
    navigate(`/invoices/${data.createOneInvoice.id}`)
  }
  return (
    <>
      <DialogContent>
        <InvoiceCreateForm id={formId} methods={methods} onSuccess={handleSubmit} />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end' }}>
        <Button data-cy="button-cancel" onClick={handleClose} variant="text">
          Cancel
        </Button>
        <LoadingButton data-cy="button-submit" loading={isLoading} variant="contained" form={formId} type="submit">
          Submit
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default withDialog('Create Invoice')(CreateInvoice)
