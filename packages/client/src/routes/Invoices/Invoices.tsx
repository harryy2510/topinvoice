import { FC, useState } from 'react'
import MainLayout from '../../components/layouts/MainLayout'
import { InvoiceSortFields, useInvoicesQuery } from '../../graphql/generated'
import useTableModifiers from '../../hooks/useTableModifiers'
import InvoiceTable from './components/InvoiceTable'
import CreateInvoice from './CreateInvoice'

const Invoices: FC = () => {
  const { paging, sortBy, tableProps, direction } = useTableModifiers<InvoiceSortFields>()
  const [addOpen, setAddOpen] = useState(false)
  const { data, isFetching } = useInvoicesQuery(
    {
      paging,
      ...(sortBy && direction ? { sorting: { field: sortBy, direction } } : {})
    },
    { keepPreviousData: true }
  )
  return (
    <MainLayout title="Invoices" onAddClick={() => setAddOpen(true)}>
      <CreateInvoice open={addOpen} onClose={() => setAddOpen(false)} />
      <InvoiceTable {...tableProps} loading={isFetching} data={data} />
    </MainLayout>
  )
}

export default Invoices
