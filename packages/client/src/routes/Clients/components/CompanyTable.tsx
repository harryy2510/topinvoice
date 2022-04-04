import { DataGridProps, GridColDef } from '@mui/x-data-grid'
import { GridValueGetterParams } from '@mui/x-data-grid/models/params/gridCellParams'
import { FC } from 'react'
import { useNavigate } from 'react-router'
import TableGrid from '../../../components/TableGrid'
import { ClientsQuery } from '../../../graphql/generated'
import useCountryState, { countryStateRef } from '../../../hooks/useCountryState'

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

const CompanyTable: FC<CompanyTableProps> = ({ data, ...props }) => {
  const navigate = useNavigate()
  const { renderCountry, renderState } = useCountryState()

  return (
    <TableGrid
      localeText={{ noRowsLabel: 'No clients' }}
      columns={companyColumns}
      rows={data?.viewer?.clients?.nodes ?? []}
      rowCount={data?.viewer?.clients?.totalCount ?? 0}
      onRowClick={(params) => navigate(`/clients/${params.id}`)}
      {...props}
    />
  )
}

export default CompanyTable
