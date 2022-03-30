import { DataGridProps, GridColDef } from '@mui/x-data-grid'
import { GridValueGetterParams } from '@mui/x-data-grid/models/params/gridCellParams'
import { FC } from 'react'
import TableGrid from '../../../components/TableGrid'
import { ClientsQuery } from '../../../graphql/generated'

export type CompanyTableProps = Partial<DataGridProps> & {
  data?: ClientsQuery
}

type Client = NonNullable<NonNullable<ClientsQuery['viewer']>['clients']>['nodes'][0]

export const companyColumns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 400 },
  {
    field: 'tax',
    headerName: 'Tax',
    width: 320,
    valueGetter: ({ row }: GridValueGetterParams<string, Client>) =>
      row.taxRate ? `${row.taxName || 'VAT'} - ${row.taxRate}%` : 'No Tax',
    sortable: false
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 400,
    valueGetter: ({ row }: GridValueGetterParams<string, Client>) =>
      [row.city, row.state, row.country].filter(Boolean).join(', '),
    sortable: false
  }
]

const CompanyTable: FC<CompanyTableProps> = ({ data, ...props }) => (
  <TableGrid
    columns={companyColumns}
    rows={data?.viewer?.clients?.nodes ?? []}
    rowCount={data?.viewer?.clients?.totalCount ?? 0}
    {...props}
  />
)

export default CompanyTable
