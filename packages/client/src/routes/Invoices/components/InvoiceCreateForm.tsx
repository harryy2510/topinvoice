import { keyBy, uniq } from 'lodash-es'
import moment from 'moment'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import * as yup from 'yup'
import Form, { FormProps } from '../../../components/forms/Form'
import FormAutocomplete from '../../../components/forms/FormAutocomplete'
import FormDatepicker from '../../../components/forms/FormDatepicker'
import { CreateInvoice, InvoiceStatusEnum } from '../../../graphql/generated'
import useClientsSearchAutocomplete from '../../Clients/hooks/useClientsSearchAutocomplete'

export const CreateInvoiceValidationSchema = yup
  .object({
    invoiceDate: yup.string().required('Required'),
    company: yup.object({
      id: yup.string().required('Required')
    })
  })
  .required()

export const CreateInvoiceDefaultValues: CreateInvoice = {
  company: {
    id: ''
  },
  invoiceDate: moment().toISOString(),
  status: InvoiceStatusEnum.Draft
}

const InvoiceCreateForm: FC<FormProps<CreateInvoice>> = ({ methods, ...props }) => {
  const defaultClientId = methods.control._defaultValues.company?.id
  const selectedClientId = methods.watch('company.id')
  const { autocompleteProps } = useClientsSearchAutocomplete(selectedClientId, defaultClientId)

  return (
    <Form<CreateInvoice> methods={methods} {...props}>
      <FormAutocomplete
        {...autocompleteProps}
        label="Client"
        placeholder="Type to search for clients"
        name="company.id"
      />
      <FormDatepicker label="Invoice Date" name="invoiceDate" />
    </Form>
  )
}

export default InvoiceCreateForm
