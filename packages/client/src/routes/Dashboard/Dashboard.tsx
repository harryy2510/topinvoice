import { Grid, Link, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Flex from '../../components/Flex'
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
          <Flex alignItems="center" mb={2}>
            <Typography variant="subtitle1">Recent Clients</Typography>
            {Boolean(clientsData?.viewer?.clients?.totalCount) && (
              <Link ml={2} variant="body2" component={RouterLink} to="clients">
                View All
              </Link>
            )}
          </Flex>
          <CompanyTable columns={modifiedCompanyColumns} hideFooter data={clientsData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Flex alignItems="center" mb={2}>
            <Typography variant="subtitle1">Recent Invoices</Typography>
            {Boolean(invoicesData?.viewer?.invoices?.totalCount) && (
              <Link ml={2} variant="body2" component={RouterLink} to="invoices">
                View All
              </Link>
            )}
          </Flex>
          <InvoiceTable columns={modifiedInvoiceColumns} hideFooter data={invoicesData} />
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default Dashboard
