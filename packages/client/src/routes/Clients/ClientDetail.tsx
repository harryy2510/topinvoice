import { ArrowDropDownOutlined, ArrowDropUpOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  ClickAwayListener,
  Grid,
  Grow,
  Link,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@mui/material'
import { bindTrigger } from 'material-ui-popup-state'
import { bindPopper, usePopupState } from 'material-ui-popup-state/hooks'
import { FC, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/Loading'
import {
  InvoiceSortFields,
  useClientDetailsQuery,
  useClientsQuery,
  useDeleteClientMutation,
  useInvoicesQuery,
  useViewerQuery
} from '../../graphql/generated'
import useCountryState from '../../hooks/useCountryState'
import useTableModifiers from '../../hooks/useTableModifiers'
import InvoiceTable from '../Invoices/components/InvoiceTable'
import Invoices from '../Invoices/Invoices'
import UpdateClient from './UpdateClient'

const ClientDetail: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [updateOpen, setUpdateOpen] = useState(false)
  const popupState = usePopupState({
    popupId: `client-detail-menu-${id}`,
    variant: 'popper'
  })
  const { renderCountry, renderState } = useCountryState()
  const { data: clientDetailsQuery } = useClientDetailsQuery({ id: id! })
  const { data: viewerQuery } = useViewerQuery()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { paging, sortBy, tableProps, direction } = useTableModifiers<InvoiceSortFields>()
  const { data, isFetching } = useInvoicesQuery(
    {
      paging,
      ...(sortBy && direction ? { sorting: { field: sortBy, direction } } : {}),
      filter: { company: { id: { eq: id } } }
    },
    { keepPreviousData: true }
  )

  const [tab, setTab] = useState('1')

  const { mutateAsync: deleteClient, isLoading: deleteClientLoading } = useDeleteClientMutation()

  const client = clientDetailsQuery?.company
  const viewer = viewerQuery?.viewer

  const handleDelete = async () => {
    popupState.close()
    await deleteClient({ input: { id: id! } })
    await queryClient.invalidateQueries(useClientsQuery.getKey())
    await queryClient.invalidateQueries(useInvoicesQuery.getKey())
    navigate('/clients')
  }

  const handleUpdate = () => {
    popupState.close()
    setUpdateOpen(true)
  }

  if (!client || !viewer) {
    return <Loading />
  }

  const actions = (
    <>
      <LoadingButton
        loading={deleteClientLoading}
        variant="contained"
        sx={{ color: (theme) => theme.palette.common.black }}
        color="inherit"
        endIcon={popupState.isOpen ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
        size="small"
        {...bindTrigger(popupState)}
      >
        Options
      </LoadingButton>
      <Popper {...bindPopper(popupState)} role={undefined} transition placement="bottom-start">
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'left bottom' : 'left top'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={popupState.close}>
                <MenuList dense>
                  <MenuItem dense onClick={handleUpdate}>
                    <ListItemIcon>
                      <EditOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                  </MenuItem>
                  <MenuItem dense onClick={handleDelete}>
                    <ListItemIcon>
                      <DeleteOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )

  return (
    <MainLayout actions={actions} title={client.name}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(event, newTab) => setTab(newTab)}>
            <Tab label="Details" value="1" />
            <Tab label="Invoices" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid mt={-2} container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="body2">
                Company Information
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Table
                  sx={{
                    '.MuiTableRow-root:last-child .MuiTableCell-root': { borderBottom: 'none' },
                    '.MuiTableCell-root': { padding: '8px 0' }
                  }}
                  size="small"
                >
                  <TableBody>
                    <TableRow>
                      <TableCell>Name:</TableCell>
                      <TableCell align="right">{client.name}</TableCell>
                    </TableRow>
                    {client.website && (
                      <TableRow>
                        <TableCell>Website:</TableCell>
                        <TableCell align="right">
                          <Link href={client.website} target="_blank">
                            {client.website}
                          </Link>
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell>Contact Name:</TableCell>
                      <TableCell align="right">{client.contactName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Contact Email:</TableCell>
                      <TableCell align="right">
                        <Link href={`mailto:${client.contactEmail}`} target="_blank">
                          {client.contactEmail}
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="body2">
                Taxes Information
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Table
                  sx={{
                    '.MuiTableRow-root:last-child .MuiTableCell-root': { borderBottom: 'none' },
                    '.MuiTableCell-root': { padding: '8px 0' }
                  }}
                  size="small"
                >
                  <TableBody>
                    <TableRow>
                      <TableCell>Tax Name:</TableCell>
                      <TableCell align="right">{client.taxName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tax Rate:</TableCell>
                      <TableCell align="right">{client.taxRate}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tax Number:</TableCell>
                      <TableCell align="right">{client.taxNumber}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="body2">
                Address
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Table
                  sx={{
                    '.MuiTableRow-root:last-child .MuiTableCell-root': { borderBottom: 'none' },
                    '.MuiTableCell-root': { padding: '8px 0' }
                  }}
                  size="small"
                >
                  <TableBody>
                    <TableRow>
                      <TableCell>Street Address:</TableCell>
                      <TableCell align="right">{client.streetAddress}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>City:</TableCell>
                      <TableCell align="right">{client.city}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>State:</TableCell>
                      <TableCell align="right">{renderState(client.country, client.state)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Country:</TableCell>
                      <TableCell align="right">{renderCountry(client.country)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Postal Code:</TableCell>
                      <TableCell align="right">{client.postalCode}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Invoices companyId={client.id} />
        </TabPanel>
      </TabContext>
      <UpdateClient open={updateOpen} onClose={() => setUpdateOpen(false)} client={client} />
    </MainLayout>
  )
}

export default ClientDetail
