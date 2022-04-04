import { Chip, ChipProps } from '@mui/material'
import { DataGridProps, GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'
import Moment from 'react-moment'
import { useNavigate } from 'react-router'
import TableGrid from '../../../components/TableGrid'
import { InvoicesQuery, InvoiceStatusEnum } from '../../../graphql/generated'
import { DEFAULT_DATE_FORMAT } from '../utils/dateFormats'
import formatInvoiceNumber from '../utils/formatInvoiceNumber'

export type InvoiceTableProps = Partial<DataGridProps> & {
  data?: InvoicesQuery
}

const chipColor = (status: InvoiceStatusEnum): ChipProps['color'] => {
  switch (status) {
    case InvoiceStatusEnum.Paid:
      return 'success'
    case InvoiceStatusEnum.Sent:
      return 'info'
    default:
      return 'default'
  }
}

export const invoiceColumns: GridColDef[] = [
  {
    field: 'invoiceNumber',
    headerName: 'Invoice#',
    width: 200,
    renderCell: (params) => formatInvoiceNumber(params.value as number)
  },
  {
    field: 'invoiceDate',
    headerName: 'Date',
    width: 200,
    renderCell: (params) => (params.value ? <Moment format={DEFAULT_DATE_FORMAT} date={params.value} /> : '-')
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    renderCell: (params) => <Chip size="small" color={chipColor(params.value)} label={params.value} />
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    width: 200,
    renderCell: (params) => (params.value ? <Moment format={DEFAULT_DATE_FORMAT} date={params.value} /> : '-')
  },
  {
    field: 'paidDate',
    headerName: 'Paid Date',
    width: 200,
    renderCell: (params) => (params.value ? <Moment format={DEFAULT_DATE_FORMAT} date={params.value} /> : '-')
  }
]

const InvoiceTable: FC<InvoiceTableProps> = ({ data, ...props }) => {
  const navigate = useNavigate()
  return (
    <TableGrid
      localeText={{ noRowsLabel: 'No invoices' }}
      columns={invoiceColumns}
      rows={data?.viewer?.invoices?.nodes ?? []}
      rowCount={data?.viewer?.invoices?.totalCount ?? 0}
      onRowClick={(params) => navigate(`/invoices/${params.id}`)}
      {...props}
    />
  )
}

export default InvoiceTable
