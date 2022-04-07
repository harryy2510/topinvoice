import { FC, useState } from 'react'
import { EnhancedAutocomplete } from '../../components/forms/FormAutocomplete'
import MainLayout from '../../components/layouts/MainLayout'
import { InvoiceSortFields, useInvoicesQuery } from '../../graphql/generated'
import useTableModifiers from '../../hooks/useTableModifiers'
import useClientsSearchAutocomplete from '../Clients/hooks/useClientsSearchAutocomplete'
import InvoiceTable from './components/InvoiceTable'
import CreateInvoice from './CreateInvoice'

export type InvoicesProps = {
  clientId?: string
}

const Invoices: FC<InvoicesProps> = ({ clientId }) => {
  const { paging, sortBy, tableProps, direction } = useTableModifiers<InvoiceSortFields>()
  const [selectedClientId, setSelectedClientId] = useState<string>()
  const [addOpen, setAddOpen] = useState(false)
  const { data, isFetching } = useInvoicesQuery(
    {
      paging,
      ...(sortBy && direction ? { sorting: { field: sortBy, direction } } : {}),
      ...(clientId || selectedClientId ? { filter: { company: { id: { eq: clientId || selectedClientId } } } } : {})
    },
    { keepPreviousData: true }
  )
  const { autocompleteProps } = useClientsSearchAutocomplete(selectedClientId)

  const actions = (
    <EnhancedAutocomplete
      {...autocompleteProps}
      margin="none"
      value={selectedClientId}
      onChange={(ev, val) => setSelectedClientId(val)}
      placeholder="Search by client"
      sx={{ mr: 2, minWidth: 220 }}
    />
  )

  return (
    <MainLayout title="Invoices" actions={actions} onAddClick={() => setAddOpen(true)}>
      <CreateInvoice companyId={clientId || selectedClientId} open={addOpen} onClose={() => setAddOpen(false)} />
      <InvoiceTable {...tableProps} loading={isFetching} data={data} />
    </MainLayout>
  )
}

export default Invoices
