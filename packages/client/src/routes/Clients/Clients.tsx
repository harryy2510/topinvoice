import { FC, useState } from 'react'
import MainLayout from '../../components/layouts/MainLayout'
import { CompanySortFields, useClientsQuery } from '../../graphql/generated'
import useTableModifiers from '../../hooks/useTableModifiers'
import CompanyTable from './components/CompanyTable'
import CreateClient from './CreateClient'

const Clients: FC = () => {
  const { paging, sortBy, tableProps, direction } = useTableModifiers<CompanySortFields>()
  const [addOpen, setAddOpen] = useState(false)
  const { data, isFetching } = useClientsQuery(
    {
      paging,
      ...(sortBy && direction ? { sorting: { field: sortBy, direction } } : {})
    },
    { keepPreviousData: true }
  )
  return (
    <MainLayout title="Clients" onAddClick={() => setAddOpen(true)}>
      <CreateClient open={addOpen} onClose={() => setAddOpen(false)} />
      <CompanyTable {...tableProps} loading={isFetching} data={data} />
    </MainLayout>
  )
}

export default Clients
