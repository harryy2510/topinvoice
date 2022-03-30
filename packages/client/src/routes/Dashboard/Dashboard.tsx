import { Grid, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'
import MainLayout from '../../components/layouts/MainLayout'
import { useClientsQuery, useInvoicesQuery } from '../../graphql/generated'
import CompanyTable, { companyColumns } from '../Clients/components/CompanyTable'
import InvoiceTable, { invoiceColumns } from '../Invoices/components/InvoiceTable'

const modifiedCompanyColumns = companyColumns
  .slice(0, 2)
  .map((column): GridColDef => ({ ...column, sortable: false, width: 260 }))

const modifiedInvoiceColumns = invoiceColumns
  .slice(0, 3)
  .map((column): GridColDef => ({ ...column, sortable: false, width: 180 }))

const Dashboard: FC = () => {
  const { data: invoicesData } = useInvoicesQuery({ paging: { limit: 5 } })
  const { data: clientsData } = useClientsQuery({ paging: { limit: 5 } })
  return (
    <MainLayout title="Dashboard">
      <Grid mt={-4} container spacing={8}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" mb={2}>
            Top Clients
          </Typography>
          <CompanyTable columns={modifiedCompanyColumns} hideFooter data={clientsData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" mb={2}>
            Top Invoices
          </Typography>
          <InvoiceTable columns={modifiedInvoiceColumns} hideFooter data={invoicesData} />
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default Dashboard
