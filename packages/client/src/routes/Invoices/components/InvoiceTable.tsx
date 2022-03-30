import { DataGridProps, GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'
import TableGrid from '../../../components/TableGrid'
import { InvoicesQuery } from '../../../graphql/generated'

export type CompanyTableProps = Partial<DataGridProps> & {
  data?: InvoicesQuery
}

type Invoice = NonNullable<NonNullable<InvoicesQuery['viewer']>['invoices']>['nodes'][0]

export const invoiceColumns: GridColDef[] = [
  { field: 'invoiceNumber', headerName: 'Invoice #', width: 200 },
  {
    field: 'invoiceDate',
    headerName: 'Date',
    width: 200
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    width: 200
  },
  {
    field: 'paidDate',
    headerName: 'Paid Date',
    width: 200
    // valueGetter: ({ row }: GridValueGetterParams<string, Invoice>) => row.paidDate
  }
]

const InvoiceTable: FC<CompanyTableProps> = ({ data, ...props }) => (
  <TableGrid
    columns={invoiceColumns}
    rows={data?.viewer?.invoices?.nodes ?? []}
    rowCount={data?.viewer?.invoices?.totalCount ?? 0}
    {...props}
  />
)

export default InvoiceTable
