import { Box, BoxProps, Card, CardContent, Divider, Typography } from '@mui/material'
import urlJoin from 'proper-url-join'
import { FC, ReactNode } from 'react'
import TopInvoiceLogo from '../../assets/icons/TopInvoiceLogo'
import config from '../../config'
import Center from '../Center'
import FacebookButton from '../social-buttons/FacebookButton'
import GoogleButton from '../social-buttons/GoogleButton'

export type AuthLayoutProps = BoxProps & {
  title: ReactNode
  showSocialLogin?: boolean
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, title, showSocialLogin, ...props }) => (
  <Center {...props} minHeight="100%">
    <Card sx={{ maxWidth: '100%', width: 440 }}>
      <CardContent sx={{ '&, &:last-child': { p: 4 } }}>
        <Center mb={4}>
          <TopInvoiceLogo sx={{ width: 245, height: 40 }} />
        </Center>
        <Typography fontWeight={600} align="center" variant="h5" color="text.secondary" mb={3}>
          {title}
        </Typography>
        {children}
        {showSocialLogin && (
          <>
            <Box my={4}>
              <Divider>OR</Divider>
            </Box>
            <GoogleButton href={urlJoin(config.apiUrl, 'auth', 'google')} sx={{ mb: 1 }} />
            <FacebookButton href={urlJoin(config.apiUrl, 'auth', 'facebook')} />
          </>
        )}
      </CardContent>
    </Card>
  </Center>
)

export default AuthLayout
