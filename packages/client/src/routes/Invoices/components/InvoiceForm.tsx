import { FC } from 'react'
import * as yup from 'yup'
import Form, { FormProps } from '../../../components/forms/Form'
import { CreateInvoice, InvoiceStatusEnum } from '../../../graphql/generated'

export const CreateInvoiceValidationSchema = yup
  .object({
    invoiceNumber: yup.string().required('Required'),
    invoiceDate: yup.number().required('Required'),
    companyId: yup.string().required('Required'),
    dueDate: yup.string(),
    status: yup.string().required('Required')
  })
  .required()

export const CreateInvoiceDefaultValues: CreateInvoice = {
  invoiceNumber: '',
  invoiceDate: '',
  companyId: '',
  dueDate: '',
  status: InvoiceStatusEnum.Draft
}

const InvoiceForm: FC<FormProps<CreateInvoice>> = ({ methods, ...props }) => (
  <Form<CreateInvoice> methods={methods} {...props}>
    {/*<FormInput sx={{ mb: 3 }} name="name" label="Invoice Name" />*/} {/*<Grid mb={3} container columnSpacing={2}>*/}{' '}
    {/*  <Grid item xs={12} sm={6}>*/}{' '}
    {/*    <FormInput name="taxName" label="Tax Name" placeholder="VAT (Default)" />*/} {/*  </Grid>*/}{' '}
    {/*  <Grid item xs={12} sm={6}>*/} {/*    <FormInput name="taxRate" label="Tax Rate (%)" type="number" />*/}{' '}
    {/*  </Grid>*/} {/*</Grid>*/} {/*<FormInput name="streetAddress" label="Street Address" />*/}{' '}
    {/*<Grid mb={3} container columnSpacing={2}>*/} {/*  <Grid item xs={12}>*/} {/*    <FormAutocomplete*/}{' '}
    {/*      name="country"*/} {/*      label="Country"*/} {/*      getOptionLabel={(option: string) => {*/}{' '}
    {/*        const country = countriesMap[option]*/} {/*        if (country) {*/}{' '}
    {/*          return `${country.emoji} ${country.name}`*/} {/*        }*/} {/*        return ''*/} {/*      }}*/}{' '}
    {/*      options={countries}*/} {/*      onChange={() => methods.setValue('state', '')}*/} {/*    />*/}{' '}
    {/*  </Grid>*/} {/*  <Grid item xs={12} sm={6}>*/} {/*    <FormInput name="city" label="City" />*/} {/*  </Grid>*/}{' '}
    {/*  <Grid item xs={12} sm={6}>*/} {/*    <FormInput name="postalCode" label="Postal Code" />*/} {/*  </Grid>*/}{' '}
    {/*</Grid>*/} {/*<FormInput name="website" label="Website" />*/}
  </Form>
)

export default InvoiceForm
