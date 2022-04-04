import { keyBy, uniq } from 'lodash-es'
import moment from 'moment'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import * as yup from 'yup'
import Form, { FormProps } from '../../../components/forms/Form'
import FormAutocomplete from '../../../components/forms/FormAutocomplete'
import FormDatepicker from '../../../components/forms/FormDatepicker'
import { CreateInvoice, InvoiceStatusEnum, SearchClientsQuery, useSearchClientsQuery } from '../../../graphql/generated'

type Client = NonNullable<NonNullable<SearchClientsQuery['viewer']>['clients']>['nodes'][0]

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
  const [searchTerm, setSearchTerm] = useState('')
  const clientMapRef = useRef<Record<string, Client>>({})

  const defaultCompanyId = methods.control._defaultValues.company?.id

  const { data, isLoading } = useSearchClientsQuery({
    filter: defaultCompanyId && !searchTerm ? { id: { eq: defaultCompanyId } } : { name: { iLike: `%${searchTerm}%` } }
  })

  const clientIds = useMemo(() => {
    const selectedClientId = methods.getValues('company.id')
    const clientIds = uniq([...(data?.viewer?.clients?.nodes?.map((node) => node.id) ?? []), selectedClientId]).filter(
      Boolean
    )
    clientMapRef.current = { ...clientMapRef.current, ...keyBy(data?.viewer?.clients?.nodes, 'id') }
    return clientIds
  }, [data])

  return (
    <Form<CreateInvoice> methods={methods} {...props}>
      <FormAutocomplete
        filterOptions={(x) => x}
        options={clientIds}
        placeholder="Type to search for clients"
        getOptionLabel={(id) => clientMapRef.current[id]?.name || ''}
        name="company.id"
        loading={isLoading}
        noOptionsText={searchTerm ? `No clients found matching term "${searchTerm}"` : 'Type to search for clients'}
        onInputChange={(event, newInputValue) => {
          setSearchTerm(newInputValue)
        }}
      />
      <FormDatepicker label="Invoice Date" name="invoiceDate" />
    </Form>
  )
}

export default InvoiceCreateForm
