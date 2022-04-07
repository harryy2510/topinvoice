import { Chip, ChipProps } from '@mui/material'
import { DataGridProps, GridColDef } from '@mui/x-data-grid'
import { GridValueGetterParams } from '@mui/x-data-grid/models/params/gridCellParams'
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

type Invoice = NonNullable<NonNullable<InvoicesQuery['viewer']>['invoices']>['nodes'][0]

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
    width: 120,
    renderCell: ({ value }: GridValueGetterParams<number, Invoice>) => formatInvoiceNumber(value)
  },
  {
    field: 'invoiceDate',
    headerName: 'Date',
    width: 160,
    renderCell: ({ value }: GridValueGetterParams<string, Invoice>) =>
      value ? <Moment format={DEFAULT_DATE_FORMAT} date={value} /> : '-'
  },
  {
    field: 'companyName',
    headerName: 'Client Name',
    width: 240,
    valueGetter: ({ row }: GridValueGetterParams<string, Invoice>) => row.company.name,
    sortable: false
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: ({ value }: GridValueGetterParams<InvoiceStatusEnum, Invoice>) => (
      <Chip size="small" color={chipColor(value)} label={value} />
    )
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    width: 200,
    renderCell: ({ value }: GridValueGetterParams<string, Invoice>) =>
      value ? <Moment format={DEFAULT_DATE_FORMAT} date={value} /> : '-'
  },
  {
    field: 'paidDate',
    headerName: 'Paid Date',
    width: 200,
    renderCell: ({ value }: GridValueGetterParams<string, Invoice>) =>
      value ? <Moment format={DEFAULT_DATE_FORMAT} date={value} /> : '-'
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
