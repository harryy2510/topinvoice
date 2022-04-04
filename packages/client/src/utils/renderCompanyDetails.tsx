import { Divider, Link, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { Company, UserCompany } from '../graphql/generated'
import { countryStateRef } from '../hooks/useCountryState'

export const renderAddress = (company?: Partial<Company | UserCompany> | null) => {
  const children: ReactNode[] = []
  if (company) {
    if (company.streetAddress) {
      children.push(
        <Typography key="streetAddress" variant="body2">
          {company.streetAddress}
        </Typography>
      )
    }
    if (company.city || company.state || company.postalCode) {
      children.push(
        <Typography key="region" variant="body2">
          {[company.city, countryStateRef.current?.renderState(company.country, company.state), company.postalCode]
            .filter(Boolean)
            .join(', ')}
        </Typography>
      )
    }
    if (company.country) {
      children.push(
        <Typography key="country" variant="body2">
          {countryStateRef.current?.renderCountry(company.country)}
        </Typography>
      )
    }
  }
  return children
}

const renderCompanyDetails = (company?: Partial<Company | UserCompany> | null) => {
  const children: ReactNode[] = []
  if (company) {
    if (company.name) {
      children.push(
        <Typography key="name" gutterBottom variant="h5">
          {company.name}
        </Typography>
      )
    }
    children.push(...renderAddress(company))
    if (company.taxNumber) {
      children.push(
        <Typography mt={1} variant="body2">
          {company.taxName || 'VAT'}# {company.taxNumber}
        </Typography>
      )
    }
    if (children.length) {
      children.push(<Divider key="divider" sx={{ my: 1 }} />)
    }
    if (company.contactName) {
      children.push(
        <Typography key="contactName" variant="body2">
          {company.contactName}
        </Typography>
      )
    }
    if (company.contactEmail) {
      children.push(
        <Link key="contactEmail" variant="body2" href={`mailto:${company.contactEmail}`} target="_blank">
          {company.contactEmail}
        </Link>
      )
    }
  }
  return children
}

export default renderCompanyDetails
