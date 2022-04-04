import { Grid, Paper, Typography } from '@mui/material'
import { FC, useEffect, useMemo } from 'react'
import * as yup from 'yup'
import Form, { FormProps } from '../../../components/forms/Form'
import FormAutocomplete from '../../../components/forms/FormAutocomplete'
import FormInput from '../../../components/forms/FormInput'
import { CreateCompany } from '../../../graphql/generated'
import useCountryState, { useDefaultCountryState } from '../../../hooks/useCountryState'

export const CreateCompanyValidationSchema = yup
  .object({
    name: yup.string().required('Required'),
    contactName: yup.string().required('Required'),
    contactEmail: yup.string().email('Enter a valid email').required('Required'),
    taxRate: yup.number().nullable().required('Required'),
    taxNumber: yup.string().required('Required'),
    taxName: yup.string(),
    streetAddress: yup.string(),
    city: yup.string(),
    state: yup.string(),
    country: yup.string().required('Required'),
    postalCode: yup.string().required('Required'),
    website: yup.string()
  })
  .required()

export const CreateCompanyDefaultValues: CreateCompany = {
  name: '',
  taxRate: null as unknown as number,
  taxName: '',
  taxNumber: '',
  streetAddress: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  website: '',
  contactName: '',
  contactEmail: ''
}

export type CompanyFormProps = FormProps<CreateCompany> & {
  hideContactDetails?: boolean
}

const CompanyForm: FC<CompanyFormProps> = ({ methods, hideContactDetails, ...props }) => {
  const { countriesMap, getStatesMap } = useCountryState()
  const { data: defaultCountryState } = useDefaultCountryState()
  const countries = useMemo(() => Object.keys(countriesMap), [countriesMap])
  const country = methods.watch('country')
  const statesMap = useMemo(() => getStatesMap(country), [getStatesMap, country])
  const states = useMemo(() => Object.keys(statesMap), [statesMap])
  useEffect(() => {
    if (!methods.getValues('country') && defaultCountryState?.country) {
      methods.setValue('country', defaultCountryState.country)
      if (defaultCountryState.state) {
        methods.setValue('state', defaultCountryState.state)
      }
    }
  }, [methods, defaultCountryState])
  return (
    <Form<CreateCompany> methods={methods} {...props}>
      <Typography gutterBottom variant="body2">
        Company Information
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 2, pt: 1 }}>
        <FormInput name="name" label="Company Name" />
        <FormInput name="website" label="Website" />
        {!hideContactDetails && (
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
              <FormInput name="contactName" label="Contact Name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInput name="contactEmail" label="Contact Email" type="email" />
            </Grid>
          </Grid>
        )}
      </Paper>
      <Typography gutterBottom variant="body2">
        Taxes Information
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 2, pt: 1 }}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6}>
            <FormInput name="taxName" label="Tax Name" placeholder="VAT (Default)" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name="taxRate" label="Tax Rate (%)" type="number" />
          </Grid>
        </Grid>
        <FormInput name="taxNumber" label="Tax Number" />
      </Paper>
      <Typography gutterBottom variant="body2">
        Address
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, pt: 1 }}>
        <FormInput name="streetAddress" label="Street Address" />
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={states.length > 0 ? 6 : 12}>
            <FormAutocomplete
              disableClearable
              name="country"
              label="Country"
              getOptionLabel={(option: string) => {
                const country = countriesMap[option]
                if (country) {
                  return `${country.emoji} ${country.name}`
                }
                return ''
              }}
              options={countries}
              onChange={() => methods.setValue('state', '')}
            />
          </Grid>
          {states.length > 0 && (
            <Grid item xs={12} sm={6}>
              <FormAutocomplete
                disableClearable
                name="state"
                label="State"
                getOptionLabel={(option: string) => statesMap[option]?.name ?? ''}
                options={states}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <FormInput name="city" label="City" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput name="postalCode" label="Postal Code" />
          </Grid>
        </Grid>
      </Paper>
    </Form>
  )
}

export default CompanyForm
