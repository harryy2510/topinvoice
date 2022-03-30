import { Button, ButtonProps, SvgIcon, SvgIconProps, Theme } from '@mui/material'
import { FC } from 'react'
import coerceArray from '../../utils/coerceArray'

const GoogleIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 48 48">
    <path
      d="m43.611 20.083h-1.611v-0.083h-18v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-11.045 0-20 8.955-20 20s8.955 20 20 20 20-8.955 20-20c0-1.341-0.138-2.65-0.389-3.917z"
      fill="#FFC107"
    />
    <path
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      fill="#FF3D00"
    />
    <path
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      fill="#4CAF50"
    />
    <path
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      fill="#1976D2"
    />
  </SvgIcon>
)

const GoogleButton: FC<ButtonProps> = (props) => (
  <Button
    size="large"
    children="Continue with Google"
    fullWidth
    disableElevation
    color="inherit"
    variant="outlined"
    startIcon={<GoogleIcon sx={{ width: '1.2em', height: '1.2em' }} />}
    {...props}
    sx={[
      (theme: Theme) => ({
        fontSize: 15,
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.common.white,
        color: theme.palette.grey['900'],
        justifyContent: 'flex-start',
        '&:hover': {
          borderColor: '#d2e3fc',
          backgroundColor: '#f8f9ff'
        },
        '& .MuiButton-startIcon': {
          marginLeft: -1.5,
          marginRight: 1
        }
      }),
      ...coerceArray(props.sx)
    ]}
  />
)

export default GoogleButton
