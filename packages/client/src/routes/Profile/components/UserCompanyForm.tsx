import { Grid, GridProps, Paper, Typography } from '@mui/material'
import { FC, useEffect, useMemo } from 'react'
import * as yup from 'yup'
import Form, { FormProps } from '../../../components/forms/Form'
import FormAutocomplete from '../../../components/forms/FormAutocomplete'
import FormInput from '../../../components/forms/FormInput'
import { UpdateUser } from '../../../graphql/generated'
import useCountryState, { useDefaultCountryState } from '../../../hooks/useCountryState'

export const UserCompanyValidationSchema = yup
  .object({
    company: yup
      .object({
        name: yup.string().required('Required'),
        contactName: yup.string().required('Required'),
        contactEmail: yup.string().email('Enter a valid email').required('Required'),
        taxRate: yup.number().nullable().min(0, 'Should be greater than or equal to 0').required('Required'),
        taxNumber: yup.string().required('Required'),
        taxName: yup.string(),
        streetAddress: yup.string(),
        city: yup.string(),
        state: yup.string(),
        country: yup.string().required('Required'),
        postalCode: yup
          .string()
          .matches(/^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/, 'Enter a valid postal code')
          .required('Required'),
        website: yup.string().url('Should be a valid url')
      })
      .required()
  })
  .required()

export const UserCompanyDefaultValues: UpdateUser = {
  company: {
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
}

export type UserCompanyFormProps = FormProps<UpdateUser> & {
  hideContactDetails?: boolean
  gridProps?: GridProps
}

const UserCompanyForm: FC<UserCompanyFormProps> = ({ gridProps, methods, hideContactDetails, children, ...props }) => {
  const { countriesMap, getStatesMap } = useCountryState()
  const { data: defaultCountryState } = useDefaultCountryState()
  const countries = useMemo(() => Object.keys(countriesMap), [countriesMap])
  const country = methods.watch('company.country')
  const statesMap = useMemo(() => getStatesMap(country), [getStatesMap, country])
  const states = useMemo(() => Object.keys(statesMap), [statesMap])
  useEffect(() => {
    if (!methods.getValues('company.country') && defaultCountryState?.country) {
      methods.setValue('company.country', defaultCountryState.country)
      if (defaultCountryState.state) {
        methods.setValue('company.state', defaultCountryState.state)
      }
    }
  }, [methods, defaultCountryState])
  return (
    <Form<UpdateUser> methods={methods} {...props}>
      <Grid spacing={4} container>
        <Grid item xs={12} {...gridProps}>
          {children}
        </Grid>
        <Grid item xs={12} {...gridProps}>
          <Typography gutterBottom variant="body2">
            Company Information
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, pt: 1 }}>
            <FormInput data-cy="input-name" name="company.name" label="Company Name" />
            <FormInput data-cy="input-website" name="company.website" label="Website" />
            {!hideContactDetails && (
              <Grid container columnSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormInput data-cy="input-contactName" name="company.contactName" label="Contact Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    data-cy="input-contactEmail"
                    name="company.contactEmail"
                    label="Contact Email"
                    type="email"
                  />
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} {...gridProps}>
          <Typography gutterBottom variant="body2">
            Taxes Information
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, pt: 1 }}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <FormInput
                  data-cy="input-taxName"
                  name="company.taxName"
                  label="Tax Name"
                  placeholder="VAT (Default)"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput data-cy="input-taxRate" name="company.taxRate" label="Tax Rate (%)" type="number" />
              </Grid>
            </Grid>
            <FormInput data-cy="input-taxNumber" name="company.taxNumber" label="Tax Number" />
          </Paper>
        </Grid>
        <Grid item xs={12} {...gridProps}>
          <Typography gutterBottom variant="body2">
            Address
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, pt: 1 }}>
            <FormInput data-cy="input-streetAddress" name="company.streetAddress" label="Street Address" />
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={states.length > 0 ? 6 : 12}>
                <FormAutocomplete
                  disableClearable
                  data-cy="input-country"
                  name="company.country"
                  label="Country"
                  getOptionLabel={(option: string) => {
                    const country = countriesMap[option]
                    if (country) {
                      return `${country.emoji} ${country.name}`
                    }
                    return ''
                  }}
                  options={countries}
                  onChange={() => methods.setValue('company.state', '')}
                />
              </Grid>
              {states.length > 0 && (
                <Grid item xs={12} sm={6}>
                  <FormAutocomplete
                    disableClearable
                    data-cy="input-state"
                    name="company.state"
                    label="State"
                    getOptionLabel={(option: string) => statesMap[option]?.name ?? ''}
                    options={states}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <FormInput data-cy="input-city" name="company.city" label="City" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormInput data-cy="input-postalCode" name="company.postalCode" label="Postal Code" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Form>
  )
}

export default UserCompanyForm
