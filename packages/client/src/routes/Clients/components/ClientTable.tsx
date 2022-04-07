import { DataGridProps, GridColDef } from '@mui/x-data-grid'
import { GridValueGetterParams } from '@mui/x-data-grid/models/params/gridCellParams'
import { FC } from 'react'
import { useNavigate } from 'react-router'
import TableGrid from '../../../components/TableGrid'
import { ClientsQuery } from '../../../graphql/generated'
import { countryStateRef } from '../../../hooks/useCountryState'

export type ClientTableProps = Partial<DataGridProps> & {
  data?: ClientsQuery
}

type Client = NonNullable<NonNullable<ClientsQuery['viewer']>['clients']>['nodes'][0]

export const clientColumns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 320 },
  {
    field: 'tax',
    headerName: 'Tax',
    width: 200,
    valueGetter: ({ row }: GridValueGetterParams<string, Client>) =>
      row.taxRate ? `${row.taxName || 'VAT'} - ${row.taxRate}%` : 'No Tax',
    sortable: false
  },
  {
    field: 'invoices',
    headerName: 'Invoices',
    width: 200,
    valueGetter: ({ row }: GridValueGetterParams<string, Client>) => row.invoicesAggregate?.[0].count?.id ?? 0,
    sortable: false
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 400,
    valueGetter: ({ row }: GridValueGetterParams<string, Client>) =>
      [
        row.city,
        countryStateRef.current?.renderState(row.country, row.state),
        countryStateRef.current?.renderCountry(row.country)
      ]
        .filter(Boolean)
        .join(', '),
    sortable: false
  }
]

const ClientTable: FC<ClientTableProps> = ({ data, ...props }) => {
  const navigate = useNavigate()
  return (
    <TableGrid
      localeText={{ noRowsLabel: 'No clients' }}
      columns={clientColumns}
      rows={data?.viewer?.clients?.nodes ?? []}
      rowCount={data?.viewer?.clients?.totalCount ?? 0}
      onRowClick={(params) => navigate(`/clients/${params.id}`)}
      {...props}
    />
  )
}

export default ClientTable
