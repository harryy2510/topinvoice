import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, DialogContent, DialogProps } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { CreateInvoice as ICreateInvoice, useInvoicesQuery, useCreateInvoiceMutation } from '../../graphql/generated'
import withDialog from '../../hoc/withDialog'
import InvoiceForm, { CreateInvoiceDefaultValues, CreateInvoiceValidationSchema } from './components/InvoiceForm'

export type CreateInvoiceProps = DialogProps & {}

const formId = 'create-invoice-form'

const CreateInvoice: FC<CreateInvoiceProps> = ({ onClose }) => {
  const { mutateAsync, isLoading } = useCreateInvoiceMutation()
  const queryClient = useQueryClient()
  const methods = useForm({
    defaultValues: CreateInvoiceDefaultValues,
    resolver: yupResolver(CreateInvoiceValidationSchema)
  })
  const handleClose = () => onClose?.({}, 'backdropClick')
  const handleSubmit = async (invoice: ICreateInvoice) => {
    await mutateAsync({ input: { invoice } })
    queryClient.invalidateQueries(useInvoicesQuery.getKey())
    handleClose()
  }
  return (
    <>
      <DialogContent>
        <InvoiceForm id={formId} methods={methods} onSuccess={handleSubmit} />
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

export default withDialog('Create Invoice')(CreateInvoice)
