import { yupResolver } from '@hookform/resolvers/yup'
import {
  AddOutlined,
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
  ArticleOutlined,
  DeleteOutlined
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Divider,
  Grid,
  Grow,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@mui/material'
import { differenceBy, intersectionWith, isEqual, omit, pick } from 'lodash-es'
import { bindTrigger } from 'material-ui-popup-state'
import { bindPopper, usePopupState } from 'material-ui-popup-state/hooks'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import Flex from '../../components/Flex'
import Form from '../../components/forms/Form'
import FormAutocomplete from '../../components/forms/FormAutocomplete'
import FormDatepicker from '../../components/forms/FormDatepicker'
import FormInput from '../../components/forms/FormInput'
import MainLayout from '../../components/layouts/MainLayout'
import Loading from '../../components/Loading'
import {
  CreateInvoiceItem,
  InvoiceDetailsQuery,
  InvoiceStatusEnum,
  UpdateInvoice,
  UpdateInvoiceItem,
  useCreateInvoiceItemsMutation,
  useDeleteInvoiceItemsMutation,
  useDeleteInvoiceMutation,
  useInvoiceDetailsQuery,
  useInvoicesQuery,
  useUpdateInvoiceItemMutation,
  useUpdateInvoiceMutation,
  useViewerQuery
} from '../../graphql/generated'
import useCountryState from '../../hooks/useCountryState'
import { formatCurrency } from '../../utils/formatters'
import renderCompanyDetails from '../../utils/renderCompanyDetails'
import InvoicePreview from './components/InvoicePreview'
import formatInvoiceNumber from './utils/formatInvoiceNumber'

type UpdateInvoiceDetails = NonNullable<InvoiceDetailsQuery['invoice']>

const formId = 'invoice-details-form'

export const InvoiceDetailValidationSchema = yup
  .object({
    invoiceDate: yup.string().required('Required'),
    dueDate: yup.string().nullable(),
    paidDate: yup.string().nullable(),
    status: yup
      .string()
      .oneOf([InvoiceStatusEnum.Draft, InvoiceStatusEnum.Sent, InvoiceStatusEnum.Paid], 'Choose a valid option')
      .required('Required'),
    items: yup.array(
      yup.object({
        name: yup.string().required('Required'),
        description: yup.string().nullable(),
        discount: yup.number().nullable().typeError('Required'),
        price: yup.number().nullable().typeError('Required').required('Required'),
        quantity: yup.number().nullable().typeError('Required').required('Required'),
        unit: yup.string().nullable()
      })
    )
  })
  .required()

const emptyInvoiceItem: Partial<NonNullable<UpdateInvoiceDetails['items']>[0]> = {
  name: '',
  description: '',
  discount: null,
  price: null as any,
  unit: '',
  quantity: 1
}

const InvoiceDetail: FC = () => {
  const anchorRef = useRef<HTMLDivElement>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const { id } = useParams<{ id: string }>()
  const popupState = usePopupState({
    popupId: `invoice-detail-menu-${id}`,
    variant: 'popper'
  })
  const { renderCountry, renderState, getCountry } = useCountryState()
  const { data: invoiceDetailsQuery } = useInvoiceDetailsQuery({ id: id! })
  const { data: viewerQuery } = useViewerQuery()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutateAsync: deleteInvoice, isLoading: deleteInvoiceLoading } = useDeleteInvoiceMutation()
  const { mutateAsync: updateInvoice, isLoading: updateInvoiceLoading } = useUpdateInvoiceMutation()
  const { mutateAsync: createInvoiceItems, isLoading: createInvoiceItemsLoading } = useCreateInvoiceItemsMutation()
  const { mutateAsync: updateInvoiceItem, isLoading: updateInvoiceItemLoading } = useUpdateInvoiceItemMutation()
  const { mutateAsync: deleteInvoiceItems, isLoading: deleteInvoiceItemsLoading } = useDeleteInvoiceItemsMutation()

  const isLoading =
    updateInvoiceLoading || createInvoiceItemsLoading || updateInvoiceItemLoading || deleteInvoiceItemsLoading

  const invoice = invoiceDetailsQuery?.invoice
  const viewer = viewerQuery?.viewer

  const methods = useForm<UpdateInvoiceDetails>({
    defaultValues: {},
    resolver: yupResolver(InvoiceDetailValidationSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'items'
  })

  const handleSubmit = async (values: UpdateInvoiceDetails) => {
    if (invoice) {
      const invoiceUpdateFields: Array<keyof UpdateInvoice> = ['invoiceDate', 'status', 'paidDate', 'dueDate']
      const newInvoiceValue = pick(values, ...invoiceUpdateFields)
      const invoiceToUpdate = isEqual(newInvoiceValue, pick(invoice, ...invoiceUpdateFields))
        ? undefined
        : newInvoiceValue
      const itemsToDelete = differenceBy(invoice?.items ?? [], values.items ?? [], 'id').map((item) => item.id)

      const invoiceItemsAddFields: Array<keyof CreateInvoiceItem> = [
        'invoice',
        'description',
        'discount',
        'name',
        'price',
        'quantity',
        'unit'
      ]

      const itemsToAdd = (values.items ?? [])
        .filter((item) => !item.id)
        .map(
          (invoiceItem) =>
            ({
              ...pick(invoiceItem, ...invoiceItemsAddFields),
              invoice: {
                id: invoice.id
              }
            } as CreateInvoiceItem)
        )

      const invoiceItemsUpdateFields: Array<keyof UpdateInvoiceItem | 'id'> = [
        'id',
        'description',
        'discount',
        'name',
        'price',
        'quantity',
        'unit'
      ]

      const itemsToUpdate = intersectionWith(
        values.items ?? [],
        invoice?.items ?? [],
        (a, b) => a.id === b.id && !isEqual(a, b)
      ).map((invoiceItem) => pick(invoiceItem, ...invoiceItemsUpdateFields))

      const promises: Promise<any>[] = []
      if (invoiceToUpdate) {
        promises.push(updateInvoice({ input: { id: invoice.id, update: invoiceToUpdate } }))
      }
      if (itemsToDelete.length) {
        promises.push(deleteInvoiceItems({ input: { filter: { id: { in: itemsToDelete } } } }))
      }
      if (itemsToAdd.length) {
        promises.push(createInvoiceItems({ input: { invoiceItems: itemsToAdd } }))
      }
      if (itemsToUpdate.length) {
        itemsToUpdate.forEach((invoiceItem) =>
          promises.push(updateInvoiceItem({ input: { update: omit(invoiceItem, 'id'), id: invoiceItem.id } }))
        )
      }

      if (promises.length) {
        await Promise.all(promises)
        queryClient.invalidateQueries(useInvoiceDetailsQuery.getKey({ id: id! }))
        queryClient.invalidateQueries(useInvoicesQuery.getKey())
      }
    }
  }

  const handleDelete = async () => {
    popupState.close()
    await deleteInvoice({ input: { id: id! } })
    await queryClient.invalidateQueries(useInvoicesQuery.getKey())
    navigate('/invoices')
  }

  const handlePreview = () => {
    popupState.close()
    setPreviewOpen(true)
  }

  useEffect(() => {
    if (invoice) {
      methods.reset(invoice)
    }
  }, [invoice])

  const country = useMemo(() => getCountry(viewer?.company?.country), [getCountry, viewer?.company?.country])

  const items = methods.watch('items')

  const subtotal = items?.reduce((subtotal, curr) => subtotal + (curr.price || 0) * (curr.quantity || 1), 0) ?? 0
  const discount = items?.reduce((discount, curr) => discount + (curr.discount || 0), 0) ?? 0
  const tax = ((subtotal - discount) * (viewer?.company?.taxRate ?? 0)) / 100
  const total = subtotal - discount + tax

  if (!invoice || !viewer) {
    return <Loading />
  }

  const actions = (
    <>
      <ButtonGroup variant="contained" ref={anchorRef}>
        <LoadingButton
          loading={deleteInvoiceLoading}
          variant="contained"
          sx={{ color: (theme) => theme.palette.common.black }}
          color="inherit"
          startIcon={popupState.isOpen ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
          size="small"
          {...bindTrigger(popupState)}
        >
          Options
        </LoadingButton>
        <LoadingButton loading={isLoading} variant="contained" form={formId} type="submit" size="small">
          Save
        </LoadingButton>
      </ButtonGroup>
      <Popper
        {...bindPopper(popupState)}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement="bottom-start"
      >
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
                  <MenuItem dense onClick={handlePreview}>
                    <ListItemIcon>
                      <ArticleOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Preview" />
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
    <MainLayout actions={actions} title={<>Invoice# {formatInvoiceNumber(invoice.invoiceNumber)}</>}>
      <Form<UpdateInvoiceDetails> id={formId} onSuccess={handleSubmit} methods={methods}>
        <Grid mt={-2} mb={4} container rowSpacing={4} columnSpacing={8}>
          <Grid item xs={12} md>
            <Typography gutterBottom variant="subtitle2" color="text.disabled">
              Invoice To:
            </Typography>
            {renderCompanyDetails(invoice.company)}
          </Grid>
          <Grid item xs={12} md>
            <Typography gutterBottom variant="subtitle2" color="text.disabled">
              Pay To:
            </Typography>
            {renderCompanyDetails(viewer.company)}
          </Grid>
          <Grid item xs={12} md>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormInput margin="none" select label="Status" name="status">
                  <MenuItem value={InvoiceStatusEnum.Draft}>{InvoiceStatusEnum.Draft}</MenuItem>
                  <MenuItem value={InvoiceStatusEnum.Sent}>{InvoiceStatusEnum.Sent}</MenuItem>
                  <MenuItem value={InvoiceStatusEnum.Paid}>{InvoiceStatusEnum.Paid}</MenuItem>
                </FormInput>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormDatepicker margin="none" label="Invoice Date" name="invoiceDate" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormDatepicker clearable margin="none" label="Due Date" name="dueDate" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormDatepicker clearable margin="none" label="Paid Date" name="paidDate" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box>
          {fields.map((invoiceItem, index) => {
            const item = methods.watch(`items.${index}`)
            return (
              <Box
                p={2}
                mb={2}
                border={1}
                borderColor="divider"
                borderRadius={1}
                key={invoiceItem.id}
                overflow="hidden"
                position="relative"
              >
                <Grid container spacing={2}>
                  <Grid xs={12} sm={8} md={10} item container spacing={1}>
                    <Grid item xs={12} sm={6} md={6}>
                      <FormInput
                        variant="filled"
                        InputProps={{ disableUnderline: true }}
                        margin="none"
                        label="Item"
                        name={`items.${index}.name`}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <FormInput
                        variant="filled"
                        InputProps={{ disableUnderline: true }}
                        margin="none"
                        label="Quantity"
                        name={`items.${index}.quantity`}
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <FormInput
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                          startAdornment: <InputAdornment position="start">{country?.currency_symbol}</InputAdornment>
                        }}
                        margin="none"
                        label="Price"
                        name={`items.${index}.price`}
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <FormInput
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                          startAdornment: <InputAdornment position="start">{country?.currency_symbol}</InputAdornment>
                        }}
                        margin="none"
                        label="Discount"
                        name={`items.${index}.discount`}
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <FormInput
                        variant="filled"
                        InputProps={{ disableUnderline: true }}
                        multiline
                        margin="none"
                        label="Description"
                        name={`items.${index}.description`}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                      <FormAutocomplete
                        variant="filled"
                        InputProps={{ disableUnderline: true }}
                        margin="none"
                        label="Unit"
                        name={`items.${index}.unit`}
                        options={['hrs', 'days', 'weeks', 'months']}
                        freeSolo
                      />
                    </Grid>
                  </Grid>
                  <Grid xs={12} sm={4} md={2} item>
                    <Table sx={{ '.MuiTableCell-root': { borderBottom: 'none' } }} padding="none" size="small">
                      <TableBody>
                        <TableRow sx={{ opacity: 0.72 }}>
                          <TableCell>Subtotal:</TableCell>
                          <TableCell>{formatCurrency(item.price * (item.quantity || 1), country?.currency)}</TableCell>
                        </TableRow>
                        <TableRow sx={{ opacity: 0.72 }}>
                          <TableCell>Discount:</TableCell>
                          <TableCell>-{formatCurrency(item.discount || 0, country?.currency)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>Total:</strong>
                          </TableCell>
                          <TableCell>
                            <strong>
                              {formatCurrency(
                                item.price * (item.quantity || 1) - (item.discount || 0),
                                country?.currency
                              )}
                            </strong>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Button
                      onClick={() => remove(index)}
                      sx={{ mt: 2 }}
                      size="small"
                      color="error"
                      startIcon={<DeleteOutlined />}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )
          })}
          <Button onClick={() => append(emptyInvoiceItem)} size="small" startIcon={<AddOutlined />}>
            Add new item
          </Button>
        </Box>
        <Flex justifyContent="flex-end">
          <Table sx={{ maxWidth: 320 }}>
            <TableBody>
              <TableRow>
                <TableCell>Subtotal</TableCell>
                <TableCell>{formatCurrency(subtotal, country?.currency)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Discount</TableCell>
                <TableCell>-{formatCurrency(discount, country?.currency)}</TableCell>
              </TableRow>
              {Boolean(viewer.company?.taxRate) && (
                <TableRow>
                  <TableCell>
                    {viewer.company?.taxName || 'VAT'} - {viewer.company?.taxRate}%
                  </TableCell>
                  <TableCell>{formatCurrency(tax, country?.currency)}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>{formatCurrency(total, country?.currency)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Flex>
      </Form>
      <InvoicePreview viewer={viewer} invoice={invoice} open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </MainLayout>
  )
}

export default InvoiceDetail
